# SEO and GEO Design

## Goal

Make NTS Distillers' public routes reliably indexable and understandable to search engines and answer engines without changing the visual product experience or making unsupported ranking claims.

## Current State

The Vite application already has a strong baseline: a production domain (`https://ntsdistillers.com`), page-level client metadata, canonical URLs, JSON-LD helpers, `robots.txt`, `sitemap.xml`, and `llms.txt`. The principal technical gap is that route-specific metadata and structured data are injected after client JavaScript runs. A crawler that reads only the initial document receives the generic homepage head for every route.

## Scope

- Generate static HTML entry files for every canonical public route at build time.
- Put route titles, descriptions, canonical URLs, Open Graph/Twitter fields, and route-appropriate JSON-LD in those initial HTML documents.
- Use a single route manifest as the source of truth for the static renderer, sitemap, and client metadata inputs.
- Keep robots crawl-friendly and retain `llms.txt` as an optional directory for non-Google answer engines.
- Add factual, visible machine-readable business context only where existing source content supports it.
- Validate generated route heads, schema JSON, sitemap coverage, robots access, internal links, and the production build.

## Non-Goals

- No guarantee of search position, indexing timing, or AI citation.
- No keyword stuffing, fabricated reviews, pricing, availability, awards, or regulatory claims.
- No visual redesign, URL changes, or replacement of the existing client-side routing behavior.
- No product `Offer` markup because availability and pricing are not published on the site.

## Architecture

### Route Manifest

Create `src/data/seoRoutes.js` as the canonical inventory of indexable routes. Each entry supplies its path, title, description, Open Graph image and alt text, page type, and JSON-LD factories. Product route entries derive their facts from `productDetailItems`; collection and content-page entries use existing page copy.

The existing runtime `setPageSeo()` call sites will consume this manifest or its shared factories. This prevents build output, sitemap entries, and browser-updated metadata from drifting apart.

### Build-Time Route Heads

Create `scripts/generate-static-seo.mjs`, run after `vite build`. The script reads `dist/index.html`, injects the full metadata and JSON-LD for every manifest route, then writes `<route>/index.html` files using absolute asset paths. A static host can therefore serve a route-specific initial HTML head for `/about`, `/products`, and every product page while the existing Vite client app continues to select the correct page from `window.location.pathname`.

The generated route documents will include a canonical URL matching the route, a `WebPage` schema, a `BreadcrumbList` where relevant, plus product and collection markup only when supported by visible content. Organization and WebSite schema remain on every route through one shared graph.

### Crawl and GEO Files

Generate `public/sitemap.xml` from the same route manifest. It will contain only canonical public pages and realistic route-specific `lastmod` dates. Remove `changefreq` and `priority`, because major search engines ignore them.

Keep `robots.txt` short and permissive for search and answer-engine discovery crawlers. It will reference the canonical sitemap. Keep `llms.txt` concise, factual, and aligned with the route manifest; it is useful as a discovery aid for some systems but is not treated as a Google ranking lever.

### Visible Entity Signals

Use existing factual content only: NTS Blenders and Distillers Pvt. Ltd., Canacona Industrial Estate in Goa, contract bottling, bonded warehousing, proprietary IMFL categories, and the disclosed production and warehouse capacity. Existing About, Distillery, FAQ, and Contact pages already carry most of this information; the implementation will add concise descriptive text only when an important service or entity is otherwise available solely through an interaction or image.

## Data and Schema Rules

- Use `Organization` and `LocalBusiness` with the published name, address, contacts, social profiles, and coordinates.
- Use `WebSite`, `WebPage`, and `BreadcrumbList` on public pages.
- Use `Product` only for published product pages. Include product name, visible description, category, image, pack, and specification. Do not add price, offers, reviews, ratings, or availability.
- Retain `FAQPage` only as semantic context for the actual FAQ content; do not expect a Google FAQ rich result.
- Use absolute URLs in canonical, Open Graph, Twitter, sitemap, and JSON-LD fields.

## Build and Validation

`npm run build` will run Vite and then static SEO generation. A validation script will parse every generated route document and verify one canonical, title, meta description, Open Graph URL/image, Twitter card, valid JSON-LD, and a matching sitemap entry. It will also verify that `robots.txt` declares the sitemap and that sitemap URLs map to generated route files.

The validation will be entirely local and deterministic. Live ranking, Search Console, PageSpeed field data, Google Business Profile, backlinks, and external citations remain outside this repository and will be reported as post-launch actions.

## Risks and Mitigations

- **Static host fallback behavior differs by provider:** route-specific `index.html` files are generated under route directories, which standard static hosts serve before a catch-all SPA fallback. Validate this on the deployment target after publishing.
- **Client and build metadata diverge:** both consume the shared route manifest.
- **Schema becomes inaccurate:** factories use only values already published in `siteData.js`, `ContentPage.jsx`, or business facts.
- **New pages are omitted:** the route manifest becomes the required place to add every new public URL, and validation fails when sitemap/build coverage is inconsistent.

## Acceptance Criteria

- Every canonical route has route-specific initial HTML metadata and JSON-LD before JavaScript executes.
- All indexable routes appear exactly once in the sitemap and are allowed by robots.
- Product pages contain truthful Product and breadcrumb schema without commercial claims that are not published.
- Home, content, collection, legal, FAQ, and product pages retain their existing visual appearance and runtime behavior.
- The build and local SEO validation complete successfully.
