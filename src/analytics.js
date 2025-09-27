import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-31QNSFMEHC"; // replace with your ID

// Initialize GA
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

// Track page view
export const trackPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

// Track custom event
export const trackEvent = ({ category, action, label }) => {
  ReactGA.event({ category, action, label });
};