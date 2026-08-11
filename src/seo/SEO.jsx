import React from 'react';
import { Helmet } from 'react-helmet-async';
import { commonOGData, generateStructuredData } from './seoConfig';

// Define core pages that SHOULD be indexed by Google
// NOTE: Product pages are now handled by ProductDetail component via Helmet meta tags
// This set only includes non-product pages
const CORE_INDEXABLE_PAGES = new Set([
  '/',
  '/about',
  '/about/quality',
  '/about/vision-and-values',
  '/about/milestone-and-recognitions',
  '/about/innovation',
  '/about/board-of-directors',
  '/contact',
  '/manufacturing',
  '/products',
  '/products/categories',
  '/products/categories/pellets',
  '/products/categories/granules',
  '/products/categories/apis-and-intermediary',
  '/products/categories/rraynex-luxe',
  '/blog',
  '/worldwide',
  '/responsibility',
  '/responsibility/csr',
  '/responsibility/sustainability',
  '/responsibility/ehs',
  '/responsibility/uplifting-ecosystem',
]);

/**
 * Check if a path should be indexed
 * @param {string} path - The current page path
 * @returns {boolean}
 */
const shouldIndex = (path) => {
  if (!path) return false;
  const normalizedPath = path.replace(/\/$/, '') || '/';
  // Check if it's a product page - these are handled by ProductDetail component
  if (normalizedPath.startsWith('/products/view/')) {
    return true; // ProductDetail sets robots via Helmet
  }
  return CORE_INDEXABLE_PAGES.has(normalizedPath);
};

/**
 * SEO Component - Reusable component for managing page meta tags
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (comma-separated)
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL (optional)
 * @param {string} props.ogType - Open Graph type (default: 'website')
 * @param {Object} props.structuredData - Custom structured data (optional)
 * @param {boolean} props.noindex - Force noindex regardless of INDEXABLE_PAGES
 */
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  structuredData,
  pageName,
  noindex = false
}) => {
  const fullTitle = title || 'Rraynex Pharmaceuticals';
  const ogImageUrl = ogImage || commonOGData.image;
  
  const defaultStructuredData = structuredData || (pageName ? generateStructuredData(pageName, {
    title,
    description,
    canonical
  }) : null);

  // Determine robots directive
  const currentPath = canonical 
    ? canonical.replace('https://rraynex.com', '').replace(/\/$/, '') || '/'
    : '/';
  const isIndexable = !noindex && shouldIndex(currentPath);
  const robotsContent = isIndexable ? 'index, follow' : 'noindex, follow';

  return (
    <Helmet>
      {/* Robots Meta Tag */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={commonOGData.site_name} />
      <meta property="og:locale" content={commonOGData.locale} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageUrl} />
      
      {/* Structured Data */}
      {defaultStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(defaultStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
export { CORE_INDEXABLE_PAGES, shouldIndex };
