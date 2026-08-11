#!/usr/bin/env node

/**
 * Verification script for SEO fixes
 * Validates that all critical SEO issues have been addressed
 */

const fs = require('fs');
const path = require('path');

console.log('\n========================================');
console.log('   RRAYNEX SEO AUDIT VERIFICATION');
console.log('========================================\n');

// 1. Verify ProductDetail.jsx has proper Helmet usage and robots meta
console.log('✓ Checking ProductDetail component...');
const productsFilePath = path.join(__dirname, 'src/Products/ProductS/Products.jsx');
const productsContent = fs.readFileSync(productsFilePath, 'utf8');

const hasHelmet = productsContent.includes('import { Helmet } from "react-helmet-async"');
const hasRobotsMeta = productsContent.includes('meta name="robots" content="index, follow"');
const hasCorrectCanonical = !productsContent.includes('#${product.slug}'); // Should NOT have hash

console.log(`  - Helmet imported: ${hasHelmet ? '✅' : '❌'}`);
console.log(`  - Robots meta tag present: ${hasRobotsMeta ? '✅' : '❌'}`);
console.log(`  - Canonical URL fixed (no hash): ${hasCorrectCanonical ? '✅' : '❌'}`);

// 2. Verify SEO.jsx no longer has hardcoded product URLs
console.log('\n✓ Checking SEO.jsx configuration...');
const seoFilePath = path.join(__dirname, 'src/seo/SEO.jsx');
const seoContent = fs.readFileSync(seoFilePath, 'utf8');

const hasDynamicProducts = seoContent.includes('/products/view/') === false || 
                          seoContent.includes('CORE_INDEXABLE_PAGES');
const noHardcodedProducts = !seoContent.includes('product-metoprolol') && 
                           !seoContent.includes('product-pregabalin');

console.log(`  - Hardcoded products removed: ${noHardcodedProducts ? '✅' : '❌'}`);
console.log(`  - Uses CORE_INDEXABLE_PAGES: ${seoContent.includes('CORE_INDEXABLE_PAGES') ? '✅' : '❌'}`);
console.log(`  - Product paths handled dynamically: ${seoContent.includes('startsWith(\'/products/view/\')') ? '✅' : '❌'}`);

// 3. Verify sitemap.xml has correct product count
console.log('\n✓ Checking sitemap.xml...');
const sitemapPath = path.join(__dirname, 'public/sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urlMatches = sitemapContent.match(/<url>/g);
const productMatches = sitemapContent.match(/<loc>https:\/\/www\.rraynex\.com\/products\/view\//g);

const expectedProducts = 91;
const actualProducts = productMatches ? productMatches.length : 0;

console.log(`  - Total URLs in sitemap: ${urlMatches ? urlMatches.length : 0}`);
console.log(`  - Product URLs in sitemap: ${actualProducts}`);
console.log(`  - Expected product count: ${expectedProducts}`);
console.log(`  - Match count correct: ${actualProducts === expectedProducts ? '✅' : '❌'}`);

// 4. Verify PRODUCTS array
console.log('\n✓ Checking PRODUCTS array...');
const productSlugs = (productsContent.match(/slug:\s*"([^"]+)"/g) || []).map(m => m.match(/"([^"]+)"/)[1]);
console.log(`  - Total products in PRODUCTS array: ${productSlugs.length}`);
console.log(`  - Matches sitemap count: ${productSlugs.length === 91 ? '✅' : '❌'}`);

// 5. Verify no orphaned URLs in sitemap
console.log('\n✓ Checking for orphaned URLs...');
const sitemapSlugs = new Set(
  (sitemapContent.match(/\/products\/view\/([^<]+)/g) || [])
    .map(m => m.replace('/products/view/', ''))
);
const productSlugsSet = new Set(productSlugs);

const orphaned = Array.from(sitemapSlugs).filter(s => !productSlugsSet.has(s));
const missing = Array.from(productSlugsSet).filter(s => !sitemapSlugs.has(s));

console.log(`  - Orphaned URLs (in sitemap but not in code): ${orphaned.length}`);
if (orphaned.length > 0) console.log(`    Examples: ${orphaned.slice(0, 3).join(', ')}`);
else console.log(`    ✅ No orphaned URLs found`);

console.log(`  - Missing URLs (in code but not in sitemap): ${missing.length}`);
if (missing.length > 0) console.log(`    Found: ${missing.join(', ')}`);
else console.log(`    ✅ All products included in sitemap`);

// 6. Verify package.json has updated build script
console.log('\n✓ Checking package.json build scripts...');
const packagePath = path.join(__dirname, 'package.json');
const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const buildScript = packageContent.scripts.build;

const hasGenerateSitemap = buildScript.includes('generate-sitemap.js');
console.log(`  - Build includes sitemap generation: ${hasGenerateSitemap ? '✅' : '❌'}`);
console.log(`  - Build script: "${buildScript}"`);

// Summary
console.log('\n========================================');
console.log('   VERIFICATION SUMMARY');
console.log('========================================');

const allPass = hasHelmet && hasRobotsMeta && hasCorrectCanonical && 
                noHardcodedProducts && actualProducts === 91 && 
                orphaned.length === 0 && hasGenerateSitemap;

console.log(allPass ? '\n✅ ALL CHECKS PASSED\n' : '\n⚠️  SOME CHECKS FAILED\n');

process.exit(allPass ? 0 : 1);
