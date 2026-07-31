import React, { useEffect, useRef } from 'react'

const DEFAULT_VIEW_SETTINGS = {}

export default function ModelBottleViewer({
  modelPath,
  materialPath,
  alt,
  transform,
  viewSettings = DEFAULT_VIEW_SETTINGS,
  reducedMotion,
  onClick,
  onLoad,
  onError
}) {
  const mountRef = useRef(null)
  const modelRef = useRef(null)
  const frameRef = useRef(null)
  const onLoadRef = useRef(onLoad)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onLoadRef.current = onLoad
  }, [onLoad])

  useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount || !modelPath) return undefined

    let disposed = false
    let renderer
    let scene
    let camera

    const resize = () => {
      if (!renderer || !camera) return
      const width = mount.clientWidth || 320
      const height = mount.clientHeight || 520
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    const setupScene = async () => {
      const [THREE, { MTLLoader }, { OBJLoader }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/MTLLoader.js'),
        import('three/examples/jsm/loaders/OBJLoader.js')
      ])
      if (disposed) return

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
      camera.position.set(0, 0.04, 6.35)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.12
      mount.appendChild(renderer.domElement)

      const key = new THREE.HemisphereLight(0xfff5df, 0x24100c, 2.8)
      scene.add(key)

      const warmKey = new THREE.DirectionalLight(0xffdfaa, 3.6)
      warmKey.position.set(3.4, 4.6, 5)
      scene.add(warmKey)

      const rim = new THREE.DirectionalLight(0xcce7ff, 2.2)
      rim.position.set(-3.5, 2.1, -2)
      scene.add(rim)

      const lowFill = new THREE.PointLight(0xffede0, 1.25, 9)
      lowFill.position.set(0, -2.2, 2.4)
      scene.add(lowFill)

      resize()

      const startTime = performance.now()
      const objLoader = new OBJLoader()
      const handleLoadError = (error) => {
        if (disposed) return
        onErrorRef.current?.(error)
      }

      const loadModel = () => {
      objLoader.load(modelPath, (object) => {
        if (disposed) return
        const box = new THREE.Box3().setFromObject(object)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const fitAxis = viewSettings.fitAxis ?? 'x'
        const fitSize = fitAxis === 'y' ? size.y : fitAxis === 'z' ? size.z : size.x
        const scale = fitSize ? 3.25 / fitSize : 1

        const compactView = mount.clientWidth < 500
        const responsiveScale = compactView ? (viewSettings.mobileScale ?? 0.68) : 1
        const responsiveY = compactView ? (viewSettings.mobileY ?? -0.42) : 0
        const viewScale = (viewSettings.scale ?? 1) * responsiveScale
        const baseX = viewSettings.x ?? 0
        const baseY = (viewSettings.y ?? -0.12) + responsiveY
        const baseZ = viewSettings.z ?? 0
        const rotationX = viewSettings.rotationX ?? 0.08
        const rotationY = viewSettings.rotationY ?? 0.2
        const rotationZ = viewSettings.rotationZ ?? -Math.PI / 2 - 0.14
        const finalScale = scale * viewScale

        object.position.set(
          -center.x * finalScale + baseX,
          -center.y * finalScale + (reducedMotion ? baseY : baseY + 0.28),
          -center.z * finalScale + baseZ
        )
        object.scale.setScalar(finalScale * (reducedMotion ? 1 : 0.88))
        object.rotation.set(rotationX, reducedMotion ? rotationY : rotationY - 1.02, rotationZ)
        object.userData.entryProgress = reducedMotion ? 1 : 0
        object.userData.baseScale = scale * viewScale
        object.userData.basePosition = {
          x: -center.x * finalScale + baseX,
          y: -center.y * finalScale + baseY,
          z: -center.z * finalScale + baseZ
        }
        object.userData.baseRotationY = rotationY
        object.userData.baseRotationX = rotationX
        object.userData.baseRotationZ = rotationZ

        object.traverse((child) => {
          if (!child.isMesh) return
          child.castShadow = true
          child.receiveShadow = true
          if (child.material) {
            child.material.envMapIntensity = 1.5
            child.material.needsUpdate = true
          }
        })

        scene.add(object)
        modelRef.current = object
        onLoadRef.current?.()
      }, undefined, handleLoadError)
      }

      if (materialPath) {
        const materialBasePath = materialPath.slice(0, materialPath.lastIndexOf('/') + 1)
        const materialFile = materialPath.slice(materialPath.lastIndexOf('/') + 1)
        const mtlLoader = new MTLLoader()
        mtlLoader.setPath(materialBasePath)
        mtlLoader.load(materialFile, (materials) => {
          if (disposed) return
          materials.preload()
          objLoader.setMaterials(materials)
          loadModel()
        }, undefined, loadModel)
      } else {
        loadModel()
      }

      const animateScene = () => {
        const model = modelRef.current
        if (model) {
          const elapsed = (performance.now() - startTime) / 1000
          const nextProgress = reducedMotion
            ? 1
            : Math.min(1, model.userData.entryProgress + 0.045)
          const eased = 1 - Math.pow(1 - nextProgress, 3)
          const idleTurn = reducedMotion ? 0 : Math.sin(elapsed * 0.75) * 0.065
          const idleFloat = reducedMotion ? 0 : Math.sin(elapsed * 1.25) * 0.04
          const idleLean = reducedMotion ? 0 : Math.sin(elapsed * 0.55) * 0.025

          model.userData.entryProgress = nextProgress
          model.scale.setScalar(model.userData.baseScale * (0.88 + eased * 0.12))
          model.position.x = model.userData.basePosition.x
          model.position.y = model.userData.basePosition.y + (1 - eased) * 0.24 + idleFloat
          model.position.z = model.userData.basePosition.z
          model.rotation.x = model.userData.baseRotationX + idleLean
          model.rotation.y = model.userData.baseRotationY - (1 - eased) * 1.05 + idleTurn + elapsed * 0.09
          model.rotation.z = model.userData.baseRotationZ + idleLean * 0.65
        }

        renderer.render(scene, camera)
        frameRef.current = requestAnimationFrame(animateScene)
      }
      animateScene()
    }

    setupScene()

    return () => {
      disposed = true
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
      scene?.traverse((object) => {
        if (!object.isMesh) return
        object.geometry?.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => {
          if (!material) return
          Object.values(material).forEach((value) => {
            if (value?.isTexture) value.dispose()
          })
          material.dispose()
        })
      })
      renderer?.forceContextLoss()
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [modelPath, materialPath, reducedMotion, viewSettings])

  return (
    <div
      ref={mountRef}
      role="img"
      aria-label={alt}
      onClick={onClick}
      style={{ transform }}
      className="relative z-10 h-full w-full max-w-[680px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.02] drop-shadow-[0_55px_65px_rgba(0,0,0,0.24)]"
    />
  )
}
