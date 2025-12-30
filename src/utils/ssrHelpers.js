/**
 * SSR/Prerender Safety Utilities
 * Use these helpers to detect react-snap prerendering and guard browser-only code
 */

/**
 * Returns true if code is running in a browser environment (not during prerender)
 */
export const isBrowser = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * Returns true if react-snap or other headless browser is prerendering
 * Checks multiple indicators for reliability
 */
export const isPrerendering = () => {
  if (!isBrowser()) return true;
  
  const ua = navigator.userAgent || '';
  const isHeadless = 
    ua.includes('HeadlessChrome') ||
    ua.includes('PhantomJS') ||
    ua.includes('Prerender') ||
    window.__PRERENDER_INJECTED !== undefined ||
    navigator.webdriver === true;
  
  return isHeadless;
};

/**
 * Returns true only when safe to run browser-only code (forms, analytics, maps, etc.)
 */
export const canRunBrowserCode = () => {
  return isBrowser() && !isPrerendering();
};

/**
 * Safe window access - returns undefined during SSR
 */
export const safeWindow = () => {
  return isBrowser() ? window : undefined;
};

/**
 * Safe document access - returns undefined during SSR
 */
export const safeDocument = () => {
  return isBrowser() ? document : undefined;
};

/**
 * Safe navigator access - returns empty object during SSR
 */
export const safeNavigator = () => {
  return isBrowser() ? navigator : {};
};

/**
 * Execute callback only in browser environment, not during prerender
 * @param {Function} callback - Function to execute
 * @param {any} fallback - Value to return during SSR/prerender
 */
export const browserOnly = (callback, fallback = null) => {
  if (canRunBrowserCode()) {
    return callback();
  }
  return fallback;
};

/**
 * Safe optional chaining replacement for SSR compatibility
 * Use this for deeply nested object access during prerendering
 * @param {Function} accessor - Function that returns the value
 * @param {any} fallback - Fallback value if accessor fails
 */
export const safeAccess = (accessor, fallback = undefined) => {
  try {
    const result = accessor();
    return result !== undefined && result !== null ? result : fallback;
  } catch {
    return fallback;
  }
};
