#!/usr/bin/env node

/**
 * Generate a clean sitemap.xml that includes only valid products from PRODUCTS array
 * Removes orphaned/deleted product URLs
 */

const fs = require('fs');
const path = require('path');

// Extract PRODUCTS array from Products.jsx
const productsFilePath = path.join(__dirname, 'src/Products/ProductS/Products.jsx');
const productsFileContent = fs.readFileSync(productsFilePath, 'utf8');

// Extract all product slugs using regex
const slugMatches = productsFileContent.match(/slug:\s*"([^"]+)"/g);
const validSlugs = new Set();

if (slugMatches) {
  slugMatches.forEach(match => {
    const slug = match.match(/"([^"]+)"/)[1];
    validSlugs.add(slug);
  });
}

console.log(`Found ${validSlugs.size} valid product slugs`);

// Core pages
const corePages = [
  { loc: 'https://www.rraynex.com/', priority: 1.0, changefreq: 'weekly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/about', priority: 0.9, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/about/vision-and-values', priority: 0.8, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/about/milestone-and-recognitions', priority: 0.8, changefreq: 'weekly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/about/innovation', priority: 0.8, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/about/quality', priority: 0.8, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/about/board-of-directors', priority: 0.7, changefreq: 'monthly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/responsibility', priority: 0.8, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/responsibility/csr', priority: 0.7, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/responsibility/sustainability', priority: 0.7, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/responsibility/ehs', priority: 0.7, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/responsibility/uplifting-ecosystem', priority: 0.7, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/manufacturing', priority: 0.6, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/products', priority: 0.7, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/products/categories', priority: 0.8, changefreq: 'weekly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/products/categories/pellets', priority: 0.8, changefreq: 'weekly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/products/categories/granules', priority: 0.8, changefreq: 'weekly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/products/categories/apis-and-intermediary', priority: 0.8, changefreq: 'weekly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/products/categories/rraynex-luxe', priority: 0.7, changefreq: 'weekly', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/blog', priority: 0.7, changefreq: 'daily', lastmod: '2025-12-24' },
  { loc: 'https://www.rraynex.com/worldwide', priority: 0.6, changefreq: 'weekly', lastmod: '2025-09-27' },
  { loc: 'https://www.rraynex.com/contact', priority: 0.7, changefreq: 'weekly', lastmod: '2025-09-27' },
];

// Build XML
let sitemapXml = '<?xml version="1.0" ?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add core pages
corePages.forEach(page => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${page.loc}</loc>\n`;
  sitemapXml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  sitemapXml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  sitemapXml += `    <priority>${page.priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

// Add valid product URLs only
const sortedSlugs = Array.from(validSlugs).sort();
sortedSlugs.forEach(slug => {
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>https://www.rraynex.com/products/view/${slug}</loc>\n`;
  sitemapXml += `    <lastmod>2025-12-24</lastmod>\n`;
  sitemapXml += `    <changefreq>weekly</changefreq>\n`;
  sitemapXml += `    <priority>0.6</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += '</urlset>\n';

// Write to public/sitemap.xml
const sitemapPath = path.join(__dirname, 'public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

console.log(`\n✅ Sitemap generated successfully`);
console.log(`   Total URLs: ${corePages.length + sortedSlugs.length}`);
console.log(`   Core pages: ${corePages.length}`);
console.log(`   Product pages: ${sortedSlugs.length}`);
console.log(`   Output: ${sitemapPath}`);
