export const BLOG_POSTS = [
  {
    id: "granules-to-growth",
    slug: "granules-to-growth",
    title: "Granules to Growth: Scaling Pharmaceutical Manufacturing",
    category: "Pharmaceuticals",
    tags: ["Manufacturing", "Innovation", "Sustainability"],
    author: "Rraynex Editorial Desk",
    date: "2025-03-21",
    readTime: 7,
    heroQuote: "Building resilient pharma supply chains starts with purposeful innovation.",
    image:
      "https://images.unsplash.com/photo-1580983669871-218b9c1c5ecf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581093588401-22b8d08a89d5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581091870632-1c3811615c8c?auto=format&fit=crop&w=600&q=80"
    ],
    summary:
      "How Rraynex expands pellet and granule manufacturing capacity while keeping regulatory, sustainability, and supply-chain resilience at the centre of every decision.",
    content: [
      "Rraynex has evolved its pellet and granule operations over the past decade to support regulated markets across the globe. By combining GMP-aligned infrastructure with flexible batch sizes, the organisation keeps quality uncompromised while scaling volume.",
      "A dedicated innovation pod works alongside production engineers to trial new formulations, capture learnings, and transfer knowledge into commercial ready lines. The result is shorter technology transfer cycles and faster responsiveness to customer briefs.",
      "Supply-chain resilience is an equally strategic pillar. The team partners with qualified vendors, builds dual sourcing plans, and invests in digital tooling for real-time visibility, ensuring commitments stand firm even in volatile market conditions." 
    ]
  },
  {
    id: "smart-automation-labs",
    slug: "smart-automation-labs",
    title: "Smart Automation Inside Our Innovation Labs",
    category: "Technology",
    tags: ["Automation", "R&D"],
    author: "Innovation Office",
    date: "2025-02-02",
    readTime: 5,
    heroQuote: "Every repetitive task we automate gives scientists more room to imagine the next breakthrough.",
    image:
      "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=600&q=80"
    ],
    summary:
      "A look at the assistive robotics, automated dispensing units, and digital quality logs modernising Rraynex innovation centres.",
    content: [
      "Rraynex innovation centres feature cobots that assist formulators during blending, sampling, and cleaning operations. The systems are calibrated to GMP norms and help reduce manual variability by up to 18%.",
      "Automated dispensing units ensure precision dosing for micro quantities during pilot runs, while digital batch records unlock audit-ready traceability. Combined, these initiatives are creating faster proof-of-concept cycles and stronger compliance baselines." 
    ]
  },
  {
    id: "market-access-blueprint",
    slug: "market-access-blueprint",
    title: "Market Access Blueprint for Emerging Regions",
    category: "Business",
    tags: ["Market Access", "Strategy"],
    author: "Commercial Excellence Team",
    date: "2024-12-12",
    readTime: 6,
    heroQuote: "Listening to local healthcare challenges unlocks the partnerships that matter.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    ],
    summary:
      "Insights from pilot launches, capacity partnerships, and regulatory preparedness that help Rraynex unlock new territories responsibly.",
    content: [
      "Emerging regions bring diverse regulatory frameworks and procurement structures. Rraynex builds market access roadmaps by combining on-ground partnerships with deep dossier readiness, ensuring responsiveness during tenders.",
      "Co-creating value propositions with distributors and public health bodies enables the organisation to align product roadmaps with real-world demand. Through this blueprint, Rraynex continues to unlock markets while upholding dependable supply." 
    ]
  }
];

export const getBlogBySlug = (slug) =>
  BLOG_POSTS.find((post) => post.slug === slug);
