import React, { Suspense, useMemo, useRef, useState, useEffect, Component } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useProgress, Html } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

function BrandedLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:12,pointerEvents:'none',userSelect:'none' }}>
        <div style={{ width:40,height:40,border:'2px solid rgba(74,21,28,0.12)',borderTop:'2px solid #E9542E',borderRadius:'50%',animation:'spin 0.9s linear infinite' }} />
        <span style={{ fontFamily:'"Space Mono",monospace',fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(74,21,28,0.55)' }}>
          {Math.round(progress)}% loading
        </span>
      </div>
    </Html>
  )
}

function BottleMesh({ objPath, mtlPath, isInteracting }) {
  const meshRef = useRef(null)
  const materials = useLoader(MTLLoader, mtlPath)
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  const scene = useMemo(() => obj.clone(true), [obj])

  useEffect(() => {
    if (!scene) return
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat) => {
          mat.metalness = 0.35
          mat.roughness = 0.55
          mat.envMapIntensity = 1.2
          mat.needsUpdate = true
        })
      }
    })
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = 3 / maxDim
    scene.scale.setScalar(scale)
    const center = new THREE.Vector3()
    box.getCenter(center)
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

    if (import.meta.env.DEV) {
      console.info('[BottleStage3D] model bounds', {
        objPath,
        mtlPath,
        size: size.toArray(),
        center: center.toArray(),
        normalizedScale: scale,
      })
    }
  }, [scene, objPath, mtlPath])

  useFrame((_, delta) => {
    if (meshRef.current && !isInteracting) {
      meshRef.current.rotation.y += delta * 0.18
    }
  })

  return <primitive ref={meshRef} object={scene} />
}

class BottleErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch { return false }
}

export default function BottleStage3D({ objPath, mtlPath, accentColor, fallbackImage, productName }) {
  const [isInteracting, setIsInteracting] = useState(false)
  const [webGLSupported] = useState(() => canUseWebGL())

  const FallbackImg = (
    <img src={fallbackImage} alt={productName}
      style={{ width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' }} />
  )

  if (!webGLSupported) return FallbackImg

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%',
        background:`radial-gradient(ellipse at 50% 60%, ${accentColor}40 0%, transparent 70%)`,
        pointerEvents:'none', zIndex:0, filter:'blur(40px)', transition:'background 0.8s ease',
      }} />
      <BottleErrorBoundary fallback={FallbackImg}>
        <Canvas
          dpr={[1,2]}
          camera={{ position:[0,0,5.5], fov:38 }}
          style={{ position:'relative', zIndex:1, width:'100%', height:'100%' }}
          gl={{ antialias:true, alpha:true }}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
          onPointerLeave={() => setIsInteracting(false)}
        >
          <ambientLight intensity={0.45} />
          <directionalLight position={[3,5,4]} intensity={1.6} color="#FFF5E8" />
          <directionalLight position={[-3,2,-2]} intensity={0.5} color="#C8D8F0" />
          <pointLight position={[0,-2,3]} intensity={0.4} color="#F4ECDF" />
          <Environment preset="studio" />
          <Suspense fallback={<BrandedLoader />}>
            <BottleMesh objPath={objPath} mtlPath={mtlPath} isInteracting={isInteracting} />
          </Suspense>
          <OrbitControls
            enableZoom={false} enablePan={false} enableRotate={true}
            autoRotate={!isInteracting} autoRotateSpeed={1.2}
            minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.6}
          />
        </Canvas>
      </BottleErrorBoundary>
    </div>
  )
}
