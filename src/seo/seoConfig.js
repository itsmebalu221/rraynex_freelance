// SEO Configuration for all pages
// This file contains meta descriptions, titles, and other SEO data for each page

export const seoConfig = {
  home: {
    title: "Delivering Quality Healthcare — Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals — delivering quality healthcare across 58+ countries. Research & development, compliant manufacturing and global partnerships.",
    keywords: "pharmaceutical company, pharma pellets manufacturers, pharma granules manufacturers, medicine manufacturing company in india",
    canonical: "https://rraynex.com/"
  },
  
  // About Pages
  aboutUs: {
    title: "About Rraynex Pharmaceuticals | Leading Pharma Manufacturer",
    description: "Learn about Rraynex Pharmaceuticals - a trusted pharmaceutical company with expertise in pellets and granules manufacturing, serving 58+ countries worldwide.",
    keywords: "about rraynex, pharmaceutical company, pharma manufacturer, pellets granules",
    canonical: "https://rraynex.com/about"
  },
  
  visionValues: {
    title: "Vision & Values | Rraynex Pharmaceuticals",
    description: "Discover Rraynex Pharmaceuticals' vision and core values driving innovation, quality, and integrity in pharmaceutical manufacturing and global healthcare.",
    keywords: "pharmaceutical vision, company values, healthcare mission, pharma ethics",
    canonical: "https://rraynex.com/about/vision-and-values"
  },
  
  milestones: {
    title: "Milestones & Recognitions | Rraynex Pharmaceuticals",
    description: "Explore Rraynex Pharmaceuticals' journey of excellence, achievements, industry recognitions, and milestones in pharmaceutical manufacturing.",
    keywords: "pharmaceutical awards, industry recognition, company milestones, pharma achievements",
    canonical: "https://rraynex.com/about/milestone-and-recognitions"
  },
  
  innovation: {
    title: "Innovation & R&D | Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals drives pharmaceutical innovation through cutting-edge research and development in pellets, granules, and advanced drug delivery systems.",
    keywords: "pharmaceutical innovation, R&D, drug development, pharmaceutical research",
    canonical: "https://rraynex.com/about/innovation"
  },
  
  quality: {
    title: "Quality Assurance | Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals maintains the highest quality standards with WHO-GMP, ISO certifications, and stringent quality control in pharmaceutical manufacturing.",
    keywords: "pharmaceutical quality, WHO-GMP, ISO certification, quality control, pharma standards",
    canonical: "https://rraynex.com/about/quality"
  },
  
  board: {
    title: "Board of Directors | Rraynex Pharmaceuticals",
    description: "Meet the experienced leadership team and board of directors guiding Rraynex Pharmaceuticals' strategic vision and global pharmaceutical operations.",
    keywords: "board of directors, pharmaceutical leadership, company management, executive team",
    canonical: "https://rraynex.com/about/board-of-directors"
  },
  
  // Responsibility Pages
  responsibility: {
    title: "Corporate Responsibility | Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals is committed to corporate social responsibility, sustainability, environmental health & safety, and community development.",
    keywords: "corporate responsibility, CSR, sustainability, environmental health safety",
    canonical: "https://rraynex.com/responsibility"
  },
  
  csr: {
    title: "Corporate Social Responsibility (CSR) | Rraynex Pharmaceuticals",
    description: "Discover Rraynex Pharmaceuticals' CSR initiatives focused on healthcare access, education, community welfare, and social impact programs.",
    keywords: "CSR, corporate social responsibility, community development, social impact",
    canonical: "https://rraynex.com/responsibility/csr"
  },
  
  sustainability: {
    title: "Sustainability Initiatives | Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals implements sustainable manufacturing practices, green technologies, and environmental conservation in pharmaceutical operations.",
    keywords: "sustainability, green pharma, environmental conservation, sustainable manufacturing",
    canonical: "https://rraynex.com/responsibility/sustainability"
  },
  
  ehs: {
    title: "Environment, Health & Safety (EHS) | Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals prioritizes environmental health and safety with robust EHS policies, workplace safety programs, and environmental protection measures.",
    keywords: "EHS, environmental health, workplace safety, safety standards, environmental protection",
    canonical: "https://rraynex.com/responsibility/ehs"
  },
  
  ecosystem: {
    title: "Uplifting Ecosystem | Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals empowers the pharmaceutical ecosystem through partnerships, supplier development, and collaborative healthcare solutions.",
    keywords: "pharmaceutical ecosystem, partnerships, supplier development, collaboration",
    canonical: "https://rraynex.com/responsibility/uplifting-ecosystem"
  },
  
  // Manufacturing
  manufacturing: {
    title: "Manufacturing Excellence | Rraynex Pharmaceuticals",
    description: "State-of-the-art pharmaceutical manufacturing facilities for pellets, granules, and dosage forms with WHO-GMP, ISO, and international compliance.",
    keywords: "pharmaceutical manufacturing, pellets manufacturing, granules production, WHO-GMP facility",
    canonical: "https://rraynex.com/manufacturing"
  },
  
  // Products
  products: {
    title: "Pharmaceutical Products | Pellets & Granules | Rraynex",
    description: "Browse Rraynex Pharmaceuticals' comprehensive portfolio of pharmaceutical pellets, granules, and specialized products for regulated and emerging markets.",
    keywords: "pharmaceutical products, pharma pellets, pharma granules, drug products",
    canonical: "https://rraynex.com/products"
  },
  
  productCategories: {
    title: "Product Categories | Rraynex Pharmaceuticals",
    description: "Explore Rraynex Pharmaceuticals' product categories including pellets, granules, specialty formulations, and therapeutic segments.",
    keywords: "product categories, pharmaceutical portfolio, drug categories, therapeutic areas",
    canonical: "https://rraynex.com/products/categories"
  },
  
  luxe: {
    title: "Rraynex Luxe | Premium Pharmaceutical Solutions",
    description: "Rraynex Luxe offers premium pharmaceutical solutions with advanced formulations, superior quality, and innovative drug delivery technologies.",
    keywords: "rraynex luxe, premium pharmaceuticals, luxury healthcare, advanced formulations",
    canonical: "https://rraynex.com/products/categories/rraynex-luxe"
  },
  
  // Blog
  blog: {
    title: "Pharmaceutical Industry Blog | Rraynex Pharmaceuticals",
    description: "Stay updated with Rraynex Pharmaceuticals' blog featuring pharmaceutical industry insights, healthcare trends, research updates, and expert perspectives.",
    keywords: "pharmaceutical blog, healthcare news, pharma industry insights, medical research",
    canonical: "https://rraynex.com/blog"
  },
  
  // Worldwide
  worldwide: {
    title: "Global Presence | Worldwide Reach | Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals serves 58+ countries across Asia, Africa, Europe, and Latin America with pharmaceutical products and partnerships.",
    keywords: "global pharmaceutical company, worldwide presence, international markets, pharma exports",
    canonical: "https://rraynex.com/worldwide"
  },
  
  // Contact
  contact: {
    title: "Contact Us | Rraynex Pharmaceuticals",
    description: "Get in touch with Rraynex Pharmaceuticals for business inquiries, partnerships, product information, or career opportunities. We're here to help.",
    keywords: "contact rraynex, pharmaceutical inquiry, business contact, pharma partnership",
    canonical: "https://rraynex.com/contact"
  }
};

// Helper function to get SEO data for a page
export const getPageSEO = (pageName) => {
  return seoConfig[pageName] || {
    title: "Rraynex Pharmaceuticals",
    description: "Rraynex Pharmaceuticals - Quality healthcare solutions worldwide.",
    keywords: "pharmaceutical company, healthcare",
    canonical: "https://rraynex.com/"
  };
};

// Common Open Graph data
export const commonOGData = {
  site_name: "Rraynex Pharmaceuticals",
  type: "website",
  locale: "en_US",
  image: "https://rraynex.com/og-image.jpg", // Update with actual OG image URL
  imageAlt: "Rraynex Pharmaceuticals Logo"
};

// Generate structured data for pages
export const generateStructuredData = (pageName, pageData) => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": pageData.canonical,
    "publisher": {
      "@type": "Organization",
      "name": "Rraynex Pharmaceuticals",
      "url": "https://rraynex.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rraynex.com/logo.png"
      }
    }
  };
  
  return baseData;
};
