/**
 * Dynamic Rendering Middleware for Express
 * 
 * Serves pre-rendered HTML snapshots to search engine bots
 * Serves SPA (index.html) to regular users
 * 
 * Reference: https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering
 * This is NOT cloaking - same content, different rendering method
 */

const fs = require('fs');
const path = require('path');

// List of bot user-agents (case-insensitive matching)
const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'yandex',
  'baiduspider',
  'duckduckbot',
  'slurp',           // Yahoo
  'facebookexternalhit',
  'twitterbot',
  'rogerbot',
  'linkedinbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'applebot',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'dotbot',
  // Additional SEO tool crawlers
  'ubersuggest',     // Ubersuggest/Neil Patel
  'uberbot',         // Ubersuggest bot
  'neilpatel',       // Neil Patel tools
  'screaming frog',  // Screaming Frog SEO Spider
  'seositecheckup',  // SEO Site Checkup
  'sitebulb',        // Sitebulb crawler
  'deepcrawl',       // DeepCrawl
  'oncrawl',         // OnCrawl
  'lumar',           // Lumar (formerly DeepCrawl)
  'serpstat',        // Serpstat
  'gtmetrix',        // GTmetrix
  'lighthouse',      // Google Lighthouse
  'pagespeed',       // PageSpeed Insights
  'woorank',         // WooRank
  'seobility',       // Seobility
  'siteanalyzer',    // Site Analyzer
  'ahrefs',          // Ahrefs (alternative)
  'moz',             // Moz crawler
  'screamingfrog',   // Screaming Frog (no space)
];

/**
 * Check if the user-agent is a known bot
 * @param {string} userAgent - The User-Agent header value
 * @returns {boolean}
 */
function isBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

/**
 * Convert URL path to snapshot file path
 * Examples:
 *   /                          -> snapshots/home.html
 *   /about                     -> snapshots/about.html
 *   /about/quality             -> snapshots/about__quality.html
 *   /products/view/product-aspirin -> snapshots/products__view__product-aspirin.html
 * 
 * @param {string} urlPath - The request URL path
 * @returns {string} - The snapshot file path (relative to build folder)
 */
function urlToSnapshotPath(urlPath) {
  // Normalize: remove trailing slash, leading slash
  let normalized = urlPath.replace(/\/$/, '').replace(/^\//, '');
  
  // Homepage
  if (!normalized || normalized === '') {
    return 'snapshots/home.html';
  }
  
  // Replace slashes with double underscores
  const fileName = normalized.replace(/\//g, '__');
  
  return `snapshots/${fileName}.html`;
}

/**
 * Express middleware for dynamic rendering
 * @param {string} buildDir - Path to the build directory
 * @returns {Function} Express middleware
 */
function dynamicRenderingMiddleware(buildDir) {
  const snapshotsDir = path.join(buildDir, 'snapshots');
  const spaPath = path.join(buildDir, 'index.html');
  
  return (req, res, next) => {
    // Skip for static assets
    if (/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|map|json|xml|txt|pdf|webp)$/i.test(req.path)) {
      return next();
    }
    
    // Skip for snapshots directory direct access
    if (req.path.startsWith('/snapshots')) {
      return next();
    }
    
    const userAgent = req.get('User-Agent') || '';
    const isBotRequest = isBot(userAgent);
    
    // For debugging
    if (isBotRequest) {
      res.set('X-Rendered-By', 'Snapshot');
    }
    
    if (isBotRequest) {
      // Try to serve snapshot
      const snapshotRelPath = urlToSnapshotPath(req.path);
      const snapshotFullPath = path.join(buildDir, snapshotRelPath);
      
      if (fs.existsSync(snapshotFullPath)) {
        console.log(`[Bot] Serving snapshot: ${snapshotRelPath} for ${req.path}`);
        return res.sendFile(snapshotFullPath);
      } else {
        console.log(`[Bot] Snapshot not found: ${snapshotRelPath}, falling back to SPA`);
      }
    }
    
    // Serve SPA for humans or when snapshot doesn't exist
    if (fs.existsSync(spaPath)) {
      return res.sendFile(spaPath);
    }
    
    // Fallback to next middleware
    next();
  };
}

module.exports = {
  isBot,
  urlToSnapshotPath,
  dynamicRenderingMiddleware,
  BOT_USER_AGENTS,
};
