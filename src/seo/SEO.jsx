import React from 'react';
import { Helmet } from 'react-helmet-async';
import { commonOGData, generateStructuredData } from './seoConfig';

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
 */
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  structuredData,
  pageName
}) => {
  const fullTitle = title || 'Rraynex Pharmaceuticals';
  const ogImageUrl = ogImage || commonOGData.image;
  
  const defaultStructuredData = structuredData || (pageName ? generateStructuredData(pageName, {
    title,
    description,
    canonical
  }) : null);

  return (
    <Helmet>
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
