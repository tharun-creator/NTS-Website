import React, { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AgeGate from './AgeGate'
import FooterRedesign from './FooterRedesign'
import SiteHeader from './SiteHeader'
import { productCategoryFilters, productCollectionHeroImage, productCollectionItems } from '../data/siteData'
import { createWebPageSchema, setPageSeo, SITE_URL } from '../lib/seo'

function ProductPageHeader() {
  return <SiteHeader current="/products" />
}

function ProductCard({ item, index }) {
  return (
    <article
      className={`collection-product-card ${item.fit ? `collection-product-card--${item.fit}` : ''}`}
      style={{
        '--collection-bottle-scale': item.collectionScale || 1,
        '--collection-bottle-y': item.collectionY || '0px',
      }}
    >
      <div className="collection-product-card__image">
        <img src={item.image} alt={`${item.name} bottle`} loading={index < 6 ? 'eager' : 'lazy'} />
      </div>
      <div className="collection-product-card__copy">
        <h2>{item.brandName || item.name}</h2>
        <p>{item.productText || item.detail}</p>
        <a href={`/products/${item.slug}`}>
          Learn More
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default function ProductCollectionPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    setPageSeo({
      title: 'Product Collection | NTS Distillers',
      description:
        'Browse the NTS Distillers whisky, brandy, and rum portfolio with product profiles and contact links.',
      path: '/products',
      image: `${SITE_URL}${productCollectionHeroImage}`,
      imageAlt: 'NTS Distillers product collection bottles',
      schema: createWebPageSchema({
        title: 'Product Collection | NTS Distillers',
        description:
          'Browse the NTS Distillers whisky, brandy, and rum portfolio with product profiles and contact links.',
        path: '/products',
        image: `${SITE_URL}${productCollectionHeroImage}`,
      }),
    })
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return productCollectionItems
    return productCollectionItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="product-collection-page">
      <AgeGate />
      <ProductPageHeader />

      <main id="main">
        <section className="collection-hero" aria-labelledby="collection-title">
          <div className="collection-hero__media" data-parallax-speed="-0.1" data-parallax-scale="1.05" aria-hidden="true">
            <figure>
              <img src={productCollectionHeroImage} alt="" loading="eager" decoding="async" />
            </figure>
          </div>

          <div className="collection-hero__copy">
            <p>Proprietary Collection</p>
            <h1 id="collection-title">NTS Product Collection</h1>
          </div>
        </section>

        <section className="collection-grid-section" aria-label="All NTS bottles">
          <div className="collection-grid-section__intro">
            <p>All bottles</p>
            <h2>Browse every label as a clear shelf-ready collection.</h2>
            <div className="collection-filter" aria-label="Filter products by category">
              {productCategoryFilters.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? 'is-active' : ''}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="collection-product-grid">
            {filteredProducts.map((item, index) => (
              <ProductCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="collection-visit-section">
          <div className="collection-visit-section__copy">
            <p>Goa distillery</p>
            <h2>Built for blending, bottling, and export scale.</h2>
            <a href="/distillery">View Facility</a>
          </div>
        </section>
      </main>

      <FooterRedesign />
    </div>
  )
}
