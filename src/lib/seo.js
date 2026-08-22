export const SITE_URL = 'https://ntsdistillers.com'
export const SITE_NAME = 'NTS Distillers'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/banner/five-bottles-liquor-table-hero.jpeg`

const defaultDescription =
  'NTS Blenders and Distillers Pvt. Ltd. is a Goa-based spirits manufacturer offering contract bottling, blending, and a proprietary IMFL portfolio.'

function upsertMeta(selector, attributes) {
  if (typeof document === 'undefined') return

  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    document.head.appendChild(tag)
  }

  Object.entries(attributes).forEach(([name, value]) => {
    tag.setAttribute(name, value)
  })
}

function upsertLink(rel, href) {
  if (typeof document === 'undefined') return

  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
}

export function setPageSeo({
  title = SITE_NAME,
  description = defaultDescription,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
} = {}) {
  if (typeof document === 'undefined') return

  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  document.title = fullTitle
  upsertLink('canonical', canonicalUrl)
  upsertMeta('meta[name="description"]', { name: 'description', content: description })
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
}
