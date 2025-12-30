import React from 'react';
import { Helmet } from 'react-helmet-async';
import { commonOGData, generateStructuredData } from './seoConfig';

// Define pages that SHOULD be indexed by Google
const INDEXABLE_PAGES = new Set([
  '/',
  '/about',
  '/about/quality',
  '/contact',
  '/manufacturing',
  // Product pages - add your 20 products here
  '/products/view/product-aspirin',
  '/products/view/product-clopidogrel',
  '/products/view/product-clopidogrel-aspirin',
  '/products/view/product-duloxetine',
  '/products/view/product-dexlansoprazole',
  '/products/view/product-esomeprazole-ec',
  '/products/view/product-omeprazole',
  '/products/view/product-pantoprazole',
  '/products/view/product-rabeprazole',
  '/products/view/product-lansoprazole',
  '/products/view/product-metoprolol',
  '/products/view/product-tamsulosin',
  '/products/view/product-venlafaxine',
  '/products/view/product-pregabalin',
  '/products/view/product-gabapentin',
  '/products/view/product-mesalamine',
  '/products/view/product-budesonide',
  '/products/view/product-orlistat',
  '/products/view/product-aceclofenac',
  '/products/view/product-diclofenac',
]);

/**
 * Check if a path should be indexed
 * @param {string} path - The current page path
 * @returns {boolean}
 */
const shouldIndex = (path) => {
  if (!path) return false;
  const normalizedPath = path.replace(/\/$/, '') || '/';
  return INDEXABLE_PAGES.has(normalizedPath);
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
export { INDEXABLE_PAGES, shouldIndex };
