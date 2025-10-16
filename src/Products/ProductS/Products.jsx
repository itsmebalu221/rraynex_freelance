import React, { useMemo, useState, useEffect } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import "./products.css";
import bg from "./bg.jpg";
import Hero from "../../Components/Hero/Hero";
import pellets from "./pellets.jpg";
import granules from "../../Components/Ecosystem/granules.png";

/* ----------------- Data ----------------- */
const PRODUCTS = [
  {
    id: "pellet-aspirin",
    slug: "product-aspirin",
    name: "Aspirin",
    type: "Pellets",
  family: "pellets",
    category: "Anti-inflammatory",
    strengths: ["50%", "60%", "75%"],
    description:
      "Analgesic and anti-inflammatory pellets engineered for cardiovascular support regimens. Uniform pellet size and controlled moisture deliver reliable dissolution in low-dose aspirin therapies.",
  grade: "IP / BP / USP / EP",
  unit: "25/50 kg",
    tags: ["pellet", "aspirin"],
    image: "/assets/products/aspirin.jpg",
  },
  {
    id: "pellet-clopidogrel",
    slug: "product-clopidogrel",
    name: "Clopidogrel",
    type: "Pellets",
  family: "pellets",
    category: "Anti-Platelet",
    strengths: ["40%", "45.45%", "50%", "60%"],
    description:
      "WHO-GMP compliant anti-platelet pellets supporting secondary prevention of atherothrombotic events. Built for consistent layering to maintain bioavailability in fixed-dose combinations.",
  grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "clopidogrel"],
    image: "/assets/products/clopidogrel.jpg",
  },
  {
    id: "pellet-clopidogrel-aspirin",
    slug: "product-clopidogrel-aspirin",
    name: "Clopidogrel + Aspirin",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Platelet",
    strengths: ["75 mg + 100 mg"],
    description:
      "Dual anti-platelet pellets that balance particle size between both actives, streamlining fixed-dose regimens for post-PCI maintenance and high-risk cardiovascular patients.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "clopidogrel", "aspirin", "dual"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-duloxetine",
    slug: "product-duloxetine",
    name: "Duloxetine",
    type: "Pellets",
    family: "pellets",
    category: "SNRI",
    strengths: ["20 mg", "30 mg", "60 mg"],
    description:
      "Enteric-coated pellets formulated for serotonin-norepinephrine reuptake inhibitor therapies addressing depression, neuropathic pain, and generalized anxiety disorders.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "duloxetine", "snri"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-dexlansoprazole",
    slug: "product-dexlansoprazole",
    name: "Dexlansoprazole DDR",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["15%", "17%", "20%", "22.5%"],
    description:
      "Dual delayed-release pellets targeting extended acid suppression, ideal for once-daily GERD control with staged gastric release.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "dexlansoprazole", "ppl"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-esomeprazole-ec",
    slug: "product-esomeprazole-ec",
    name: "Esomeprazole EC",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["8.5%", "22.5%"],
    description:
      "Enteric-coated esomeprazole pellets with tight moisture control to maintain proton pump inhibition for GERD and erosive esophagitis regimens.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "esomeprazole", "ppl"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-esomeprazole-magnesium",
    slug: "product-esomeprazole-magnesium",
    name: "Esomeprazole Magnesium Trihydrate",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["8.5%", "22.5%"],
    description:
      "Magnesium-trihydrate based pellets built for high acid resistance and rapid dissolution convergence, supporting chronic GERD therapy.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "esomeprazole", "magnesium"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-esomeprazole-levosulpiride",
    slug: "product-esomeprazole-levosulpiride",
    name: "Esomeprazole + Levosulpiride",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["40 mg + 75 mg"],
    description:
      "Bilayered pellets combining acid suppression with prokinetic support, engineered to minimise segregation in capsule fills.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "esomeprazole", "levosulpiride"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-esomeprazole-domperidone",
    slug: "product-esomeprazole-domperidone",
    name: "Esomeprazole + Domperidone",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["40 mg + 30 mg"],
    description:
      "Combination pellets delivering coordinated acid suppression and antiemetic relief, validated for stability in dual-drum packaging.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "esomeprazole", "domperidone"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-itraconazole",
    slug: "product-itraconazole",
    name: "Itraconazole",
    type: "Pellets",
    family: "pellets",
    category: "Anti-fungal",
    strengths: ["20%", "22%", "40%", "44%"],
    description:
      "Spheronised antifungal pellets ready for capsule filling, ensuring uniform azole distribution for systemic mycosis management.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "itraconazole", "antifungal"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-lansoprazole",
    slug: "product-lansoprazole",
    name: "Lansoprazole",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["8.5%", "12.5%", "30%"],
    description:
      "Enteric-coated lansoprazole pellets providing rapid acid control with low ash content for clean compression runs.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "lansoprazole", "ppl"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-levosulpiride",
    slug: "product-levosulpiride",
    name: "Levosulpiride SR",
    type: "Pellets",
    family: "pellets",
    category: "Antipsychotic",
    strengths: ["40%"],
    description:
      "Sustained-release pellets optimised for gastrointestinal motility and antipsychotic indications, supporting once-daily dosing.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "levosulpiride", "sr"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-mebeverine",
    slug: "product-mebeverine",
    name: "Mebeverine",
    type: "Pellets",
    family: "pellets",
    category: "Anti-inflammatory",
    strengths: ["40%", "80%"],
    description:
      "Antispasmodic pellets for IBS and gastrointestinal cramp relief, delivering controlled release profiles through robust layering.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "mebeverine"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-nifedipine",
    slug: "product-nifedipine",
    name: "Nifedipine SR",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Hypertensive",
    strengths: ["11%", "18.5%"],
    description:
      "Sustained-release calcium channel blocker pellets ensuring smooth plasma levels for chronic hypertension management.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "nifedipine", "sr"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-omeprazole",
    slug: "product-omeprazole",
    name: "Omeprazole EC",
    type: "Pellets",
  family: "pellets",
    category: "Anti-Ulcerant (Ppls)",
    strengths: ["7.5%", "8.5%", "10%", "15%", "22.5%"],
    description:
      "Delayed release pellets for GERD, erosive esophagitis, and H. pylori regimens. Tight pellet sizing and durable enteric layers secure acid resistance for MUPS and capsule filling.",
  grade: "IP / BP / USP / EP",
  unit: "25/50 kg",
    tags: ["pellet", "omeprazole", "ec"],
    image: "/assets/products/omeprazole.jpg",
  },
  {
    id: "pellet-omeprazole-domperidone-10",
    slug: "product-omeprazole-domperidone-10",
    name: "Omeprazole + Domperidone (20 mg + 10 mg)",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["20 mg + 10 mg"],
    description:
      "Bilayer pellets combining acid suppression with prokinetic support, suitable for capsule and sachet presentations targeting reflux-associated nausea.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "omeprazole", "domperidone"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-omeprazole-domperidone-30",
    slug: "product-omeprazole-domperidone-30",
    name: "Omeprazole + Domperidone (20 mg + 30 mg)",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["20 mg + 30 mg"],
    description:
      "Higher domperidone load pellets delivering enhanced gastric motility support alongside omeprazole-driven acid suppression.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "omeprazole", "domperidone"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-orlistat",
    slug: "product-orlistat",
    name: "Orlistat",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Obesity",
    strengths: ["50%"],
    description:
      "Lipase-inhibiting pellets created for weight management therapies, formulated to minimise oily spotting and maintain potency.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "orlistat"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-pantoprazole",
    slug: "product-pantoprazole",
    name: "Pantoprazole",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["8.5%", "15%", "20%", "22.5%", "25%", "30%"],
    description:
      "Multi-strength pantoprazole pellets for erosive esophagitis and GERD therapies, demonstrating low ash content for clean processing.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "pantoprazole", "ppl"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-pantoprazole-domperidone",
    slug: "product-pantoprazole-domperidone",
    name: "Pantoprazole + Domperidone",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["40 mg + 30 mg"],
    description:
      "Combination pellets balancing acid suppression with antiemetic action, optimised for capsule blends without segregation.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "pantoprazole", "domperidone"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-pantoprazole-levosulpiride",
    slug: "product-pantoprazole-levosulpiride",
    name: "Pantoprazole + Levosulpiride",
    type: "Pellets",
    family: "pellets",
  category: "Anti-Ulcerant (Ppls)",
    strengths: ["40 mg + 75 mg"],
    description:
      "Layered pellets supporting gastroparesis management with coordinated acid control and prokinetic coverage.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "pantoprazole", "levosulpiride"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-rabeprazole-ec",
    slug: "product-rabeprazole-ec",
    name: "Rabeprazole EC",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Ulcerant (PPLs)",
    strengths: ["7.5%", "8.5%", "15%", "20%"],
    description:
      "Rapid-onset rabeprazole pellets delivering potent acid suppression, validated for low moisture pickup and minimal ash content.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "rabeprazole", "ppl"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-rabeprazole-sodium",
    slug: "product-rabeprazole-sodium",
    name: "Rabeprazole Sodium EC",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Ulcerant (PPLs)",
    strengths: ["7.5%", "8.5%", "10%", "15%"],
    description:
      "Sodium salt pellets engineered for quick acid suppression and compatibility with sachets and capsules.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "rabeprazole", "sodium"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-rabeprazole-domperidone",
    slug: "product-rabeprazole-domperidone",
    name: "Rabeprazole + Domperidone",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Ulcerant (PPLs)",
    strengths: ["20 mg + 30 mg"],
    description:
      "Combination pellets offering relief from acid reflux and associated nausea, maintaining uniformity across fills.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "rabeprazole", "domperidone"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-rabeprazole-levosulpiride",
    slug: "product-rabeprazole-levosulpiride",
    name: "Rabeprazole + Levosulpiride",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Ulcerant (PPLs)",
    strengths: ["20 mg + 75 mg"],
    description:
      "Dual-action pellets for GERD with prokinetic support, stabilised for low moisture to protect both actives.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "rabeprazole", "levosulpiride"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-diltiazem",
    slug: "product-diltiazem",
    name: "Diltiazem FR / SR",
    type: "Pellets",
    family: "pellets",
    category: "Cardiovascular",
    strengths: [],
    description:
      "Sustained and fast-release diltiazem pellets supporting flexible dosing for angina and hypertension therapy.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "diltiazem", "sr"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-rosuvastatin",
    slug: "product-rosuvastatin",
    name: "Rosuvastatin",
    type: "Pellets",
    family: "pellets",
    category: "Lipid Lowering",
    strengths: ["5 mg", "10 mg", "20 mg"],
    description:
      "Statin pellets calibrated for LDL reduction programs, enabling stable plasma profiles in once-daily regimens.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "rosuvastatin"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-tamsulosin-dutasteride-02",
    slug: "product-tamsulosin-dutasteride-02",
    name: "Tamsulosin + Dutasteride (0.2% + 0.5%)",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Cancer",
    strengths: ["0.2% + 0.5%"],
    description:
      "Combination pellets supplying alpha-blocker and 5-alpha reductase inhibition for prostate health portfolios.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "tamsulosin", "dutasteride"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-tamsulosin-dutasteride-04",
    slug: "product-tamsulosin-dutasteride-04",
    name: "Tamsulosin + Dutasteride (0.4% + 0.5%)",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Cancer",
    strengths: ["0.4% + 0.5%"],
    description:
      "Higher strength pellets for combined BPH symptom relief, validated for low segregation in capsule formats.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "tamsulosin", "dutasteride"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-venlafaxine",
    slug: "product-venlafaxine",
    name: "Venlafaxine HCl",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Depressant",
    strengths: ["50%"],
    description:
      "Extended-release pellets for SNRI therapy supporting depression and anxiety management with smooth pharmacokinetics.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "venlafaxine", "snri"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-omeprazole-mups",
    slug: "product-omeprazole-mups",
    name: "Omeprazole MUPS / Dexlansoprazole MUPS",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Ulcerant (PPLs)",
    strengths: ["8.5%", "15%", "22.5%"],
    description:
      "Multi-unit pellet systems designed for suspension and ODT formats, providing flexible GERD therapy options.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "omeprazole", "mups", "dexlansoprazole"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-esomeprazole-mups",
    slug: "product-esomeprazole-mups",
    name: "Esomeprazole MUPS",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Ulcerant (PPLs)",
    strengths: ["15%", "22.5%"],
    description:
      "MUPS-grade esomeprazole pellets validated for paediatric and geriatric formulations requiring dispersion and reconstitution.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "esomeprazole", "mups"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "pellet-rabeprazole-mups",
    slug: "product-rabeprazole-mups",
    name: "Rabeprazole MUPS",
    type: "Pellets",
    family: "pellets",
    category: "Anti-Ulcerant (PPLs)",
    strengths: ["15%"],
    description:
      "Multi-unit pellets enabling fast dispersal and patient-friendly dosing for acid suppression therapies.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["pellet", "rabeprazole", "mups"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-paracetamol",
    slug: "product-paracetamol",
    name: "Paracetamol DC",
    type: "Granules",
  family: "granules",
    category: "Analgesic",
    strengths: [],
    description:
      "Direct compression granules supporting antipyretic and analgesic presentations. Optimized flow keeps high-speed tableting within weight variation limits.",
  grade: "IP / BP / USP / EP",
  unit: "25/50 kg",
    tags: ["granule", "paracetamol"],
    image: "/assets/products/paracetamol.jpg",
  },
  {
    id: "api-omeprazole",
    slug: "product-api-omeprazole",
    name: "Omeprazole (API)",
    type: "API",
  family: "api",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Proton pump inhibitor API aligned to global pharmacopoeial monographs. Suitable for delayed release pellets, tablets, and suspensions targeting acid suppression therapies.",
  grade: "IP / BP / USP / EP",
  unit: "25/50 kg",
    tags: ["api", "omeprazole"],
    image: "/assets/products/api-omeprazole.jpg",
  },
  {
    id: "fdf-probiotic",
    slug: "product-fdf-probiotic",
    name: "Probiotic Sachet Blend",
    type: "Finished Dose Formulation",
    family: "fdf",
    category: "Nutraceutical",
    strengths: [],
    description:
      "High-viability blends formulated for gut health and immune support lines. Controlled moisture packaging protects CFU counts across extended distribution.",
  grade: "IP / BP / USP / EP",
    unit: "box",
    tags: ["fdf", "sachet"],
    image: "/assets/products/placeholder.jpg",
  },
];

const PRODUCT_NARRATIVES = {
  "product-aspirin": [
    "Aspirin pellets are milled to a narrow size band, supporting once-daily cardioprotective regimens and combination analgesics without segregation.",
    "Validated coating cycles maintain low residual solvent and precise weight gain, protecting platelet inhibition performance in low-dose formats.",
    "Pellet durability and reduced ash specification translate to clean downstream compression and encapsulation in global filings."
  ],
  "product-clopidogrel": [
    "Segregated suites and inline classification maintain free-flowing pellets that align to anti-platelet combination therapy needs.",
    "Stabilised layering protects the prodrug during humidity stress, keeping platelet aggregation profiles intact across shelf life.",
    "Regulatory packages include dissolution, particle size, and moisture studies supporting ROW and emerging market submissions."
  ],
  "product-omeprazole": [
    "Enteric pellets are tuned for GERD, erosive esophagitis, and triple therapy packs, keeping acid uptake below pharmacopeial limits.",
    "Multi-layer barriers withstand compression for MUPS and tablets while preserving gastric resistance across strengths.",
    "Complete dossiers cover pellet size uniformity, moisture bands, and ash content to accelerate approvals in regulated markets."
  ],
  "product-paracetamol": [
    "Paracetamol direct-compression granules support analgesic and antipyretic lines with uniform particle distribution.",
    "Controlled drying caps moisture for long-term stability and reduces sticking on high-speed rotary presses.",
    "Pack formats and documentation help brands react quickly to seasonal demand while staying within pharmacopeial limits."
  ],
  "product-api-omeprazole": [
    "Omeprazole API supports oral and parenteral acid suppression therapies with impurity profiles aligned to IP/BP/USP/EP specs.",
    "Online pH, particle size, and moisture controls keep conversion rates steady during multi-ton campaigns.",
    "DMF packages, stability, and method validations ship with each inquiry to accelerate market registrations."
  ],
  "product-fdf-probiotic": [
    "Blends are positioned for digestive wellness and immune support claims with pre-screened strains for high CFU delivery.",
    "Moisture-protective laminates and pelletized excipients defend viability through ambient shipping windows.",
    "Partners receive validation templates, regulatory statements, and ready-to-deploy artwork to fast-track launches."
  ]
};

const ROUTE_FILTERS = {
  "apis-and-intermediary": {
    label: "APIs and Intermediaries",
    bgImage: pellets,
    tagline: "Our APIs are engineered with precision and purity, ensuring consistent therapeutic performance and global regulatory compliance.",
    matches: (product) => product.family === "api" || product.family === "intermediary",
    defaultType: "API",
  },
  "api": {
    label: "APIs",
    bgImage: pellets,
    tagline: "Our APIs are engineered with precision and purity, ensuring consistent therapeutic performance and global regulatory compliance.",
    matches: (product) => product.family === "api",
    defaultType: "API",
  },
  intermediary: {
    label: "Intermediaries",
    bgImage: pellets,
    tagline:"Our advanced intermediates strengthen the pharmaceutical supply chain with superior consistency, scalability, and quality assurance.",
    matches: (product) => product.family === "intermediary",
    defaultType: "All",
  },
  pellets: {
    label: "Pellets",
    bgImage: pellets,

    tagline: "We manufacture a diverse range of sustained and delayed release pellets designed for consistent quality and precision performance.",
    matches: (product) => product.family === "pellets",
    defaultType: "Pellets",
  },
  granules: {
    label: "Granules",
    bgImage: granules,
    tagline:"Our DC granules deliver exceptional flow, compressibility, and uniformity, ensuring efficiency in downstream tableting processes.",
    matches: (product) => product.family === "granules",
    defaultType: "Granules",
  },
  fdf: {
    label: "Finished Dose Forms",
    tagline: "Finished dose formulations backed by validation support and market-ready packaging options.",
    matches: (product) => product.family === "fdf",
    defaultType: "Finished Dose Formulation",
  },
};

const CATEGORY_ALIASES = {
  api: "api",
  apis: "api",
  "active-pharmaceutical-ingredients": "api",
  intermediary: "intermediary",
  intermediaries: "intermediary",
  intermediate: "intermediary",
  intermediates: "intermediary",
  pellet: "pellets",
  pellets: "pellets",
  granule: "granules",
  granules: "granules",
  "api-and-intermediary": "api",
  "apis-and-intermediaries": "api",
  "api-intermediary": "api",
  fdf: "fdf",
  "finished-dose-forms": "fdf",
};

const PRODUCT_MENU = [
  { to: "/products", label: "All" },
  { to: "/products/categories/pellets", label: "Pellets" },
  { to: "/products/categories/granules", label: "Granules" },
  { to: "/products/categories/api", label: "APIs" },
  { to: "/products/categories/intermediary", label: "Intermediaries" },
  { to: "/products/categories/fdf", label: "Finished Dose Forms" },
];

/* ----------------- SEO helpers ----------------- */

function setMetaTitle(title) {
  if (typeof document !== "undefined" && title) document.title = title;
}

function setMetaDescription(desc) {
  if (typeof document === "undefined") return;
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", desc);
}

function setCanonical(url) {
  if (typeof document === "undefined") return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function injectJsonLd(id, obj) {
  if (typeof document === "undefined") return;
  const prev = document.getElementById(id);
  if (prev) prev.remove();
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.text = JSON.stringify(obj);
  document.head.appendChild(script);
}

/* ----------------- ProductDetail (polished, responsive, accessible) ----------------- */

function ProductDetail({ product, onBack }) {
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    if (!product) return;

    // SEO: meta, canonical, JSON-LD
    const shortDesc = `${product.name} — ${product.type} (${product.category}). ${product.description} Available in strengths: ${
      product.strengths?.length ? product.strengths.join(", ") : "various strengths"
    }. Grade: ${product.grade || "IP / BP / USP / EP"}.`;
    const title = `${product.name} | Rraynex — Pharma Pellets & APIs`;
    setMetaTitle(title);
    setMetaDescription(shortDesc);

    const url = `${window.location.origin}${window.location.pathname}#${product.slug}`;
    setCanonical(url);

    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: product.image ? [product.image] : [window.location.origin + bg],
      description: product.description,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Grade",
          value: product.grade || "IP / BP / USP / EP",
        },
      ],
      brand: { "@type": "Brand", name: "Rraynex" },
    };
    injectJsonLd("product-jsonld", productSchema);

    // FAQ JSON-LD (matching visible FAQs)
    const faqItems = [
      {
        q: "How can I request a sample?",
        a: `Click 'Request Details' or 'Contact Sales' — or email communications@rraynex.com`,
      },
      {
        q: "Do you provide DMF / COA?",
        a: "DMF, COA and stability data are available on request for registered APIs and pellets. Contact sales for access procedures.",
      },
      {
        q: "What packaging options are available?",
        a: "Standard packaging: sealed bags (25kg/50kg) or drums. Custom packaging available on request.",
      },
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    injectJsonLd("faq-jsonld", faqSchema);

    return () => {
      const p = document.getElementById("product-jsonld");
      if (p) p.remove();
      const f = document.getElementById("faq-jsonld");
      if (f) f.remove();
    };
  }, [product]);

  useEffect(() => setOpenIdx(null), [product]);

  if (!product) return null;

  const longDescription = (PRODUCT_NARRATIVES[product.slug] || []).join("\n\n") || product.description;

  const specs = [
    { label: "Grade", value: product.grade || "IP / BP / USP / EP" },
    { label: "Type", value: product.type },
    { label: "Category", value: product.category },
    { label: "Pack size", value: product.unit },
    { label: "Available strengths", value: product.strengths?.length ? product.strengths.join(", ") : "Custom / On request" },
    { label: "Certifications", value: "WHO-GMP, ISO 9001, ISO 14001" },
  ];

  const faqs = [
    {
      q: "How can I request a sample?",
      a: `Click 'Request Quote' or 'Contact Sales' — or email communications@rraynex.com with product grade ${product.grade || "IP / BP / USP / EP"}.`,
    },
    {
      q: "Do you provide DMF / COA?",
      a: "DMF, COA and stability data are available on request for registered APIs and pellets. Contact sales for access procedures.",
    },
    {
      q: "What packaging options are available?",
      a: "Standard packaging: sealed bags (25kg/50kg) or drums. Custom packaging available on request; contact our sales team for MOQs.",
    },
  ];

  function toggleFaq(i) {
    setOpenIdx(openIdx === i ? null : i);
  }

  return (
    <article className="rr-detail" itemScope itemType="https://schema.org/Product">
      <button className="back-link" onClick={onBack}>← Back to products</button>

      <div className="rr-detail-grid">
        <div className="rr-detail-main">
          <div className="rr-detail-body">
            <h1 itemProp="name">{product.name}</h1>
            <div className="rr-product-cat"><span itemProp="category">{product.category}</span> • <span>{product.type}</span></div>
            <p className="rr-desc" itemProp="description">{product.description}</p>

            {product.strengths?.length > 0 && (
              <div className="rr-strengths" aria-hidden>
                {product.strengths.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            )}

            <ul className="rr-meta">
              <li>
                <span>Grade</span>
                <strong>{product.grade || "IP / BP / USP / EP"}</strong>
              </li>
              <li>
                <span>Pack Size</span>
                <strong>{product.unit}</strong>
              </li>
              <li>
                <span>Certifications</span>
                <strong>WHO-GMP • ISO 9001</strong>
              </li>
            </ul>
          </div>

          <div className="rr-fullwidth">
            {/* Overview */}
            <section aria-labelledby="product-overview" className="rr-section">
              <h2 id="product-overview">Product overview</h2>
              <p style={{ whiteSpace: "pre-wrap" }}>{longDescription}</p>
            </section>

            {/* Specs */}
            <section id="product-specs" className="rr-section rr-specs">
              <h3>Technical specifications</h3>
              <dl>
                {specs.map((s) => (
                  <div key={s.label} style={{ marginBottom: 8 }}>
                    <dt style={{ fontWeight: 700 }}>{s.label}</dt>
                    <dd style={{ margin: 0 }}>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* FAQ Accordion */}
            <section className="rr-section rr-faq" aria-labelledby="faqs">
              <h3 id="faqs">Frequently asked questions</h3>
              <div>
                {faqs.map((f, i) => (
                  <div
                    key={i}
                    className="faq-item"
                    aria-expanded={openIdx === i ? "true" : "false"}
                  >
                    <button
                      className="faq-button"
                      onClick={() => toggleFaq(i)}
                      aria-controls={`faq-panel-${i}`}
                      aria-expanded={openIdx === i ? "true" : "false"}
                    >
                      <span className="q">{f.q}</span>
                      <span className="chev" aria-hidden>▾</span>
                    </button>

                    <div
                      id={`faq-panel-${i}`}
                      className="faq-panel"
                      role="region"
                    >
                      <div>{f.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside className="rr-detail-sidebar">
          <div className="rr-contact-card" role="region" aria-label="Request product information">
            <div>
              <div className="rr-cert small" style={{ marginBottom: 8 }}>Certifications: WHO-GMP</div>
              <p className="rr-contact-note">
                Share your formulation needs and regulatory scope, and our commercial team will respond within one business day.
              </p>
            </div>

            <div className="rr-cta-buttons">
              <a
                className="btn-primary rr-sticky-btn"
                href={`mailto:communications@rraynex.com?subject=${encodeURIComponent("Product Enquiry: " + product.name)}&body=${encodeURIComponent("Please share technical dossier access and commercial details for grade: " + (product.grade || "IP / BP / USP / EP"))}`}
              >
                Request Details
              </a>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

/* ---------- ProductCard (image fallback) ---------- */

function ProductCard({ p }) {
  return (
    <article className="product-card" key={p.id}>
      <header className="product-card__meta">
        <span className="product-card__badge product-card__badge--type">{p.type}</span>
        <span className="product-card__badge product-card__badge--category">{p.category}</span>
      </header>

      <div className="product-card__body">
        <h3>{p.name}</h3>
        <p>{p.description}</p>

        {p.strengths?.length > 0 && (
          <div className="product-card__strengths" aria-label="Available strengths">
            {p.strengths.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        )}

        <dl className="product-card__specs">
          <div>
            <dt>Grade</dt>
            <dd>{p.grade || "IP / BP / USP / EP"}</dd>
          </div>
          <div>
            <dt>Pack size</dt>
            <dd>{p.unit}</dd>
          </div>
        </dl>
      </div>

      <footer className="product-card__footer">
        <Link className="btn btn-primary" to={`/products/view/${p.slug}`}>
          Know More
        </Link>
      </footer>
    </article>
  );
}

/* ---------- ProductDetailPage (route target) ---------- */

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (!product) {
      // If product not found, send user back to listing.
      navigate("/products", { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  return <ProductDetail product={product} onBack={() => navigate(-1)} />;
}

/* ---------- Main ProductsPage ---------- */

export default function ProductsPage() {
  const navigate = useNavigate();
  const { category: categorySlugRaw } = useParams();
  const categorySlug = categorySlugRaw ? categorySlugRaw.toLowerCase() : null;
  const categoryKey = categorySlug ? CATEGORY_ALIASES[categorySlug] || categorySlug : null;
  const routeFilter = categoryKey ? ROUTE_FILTERS[categoryKey] : null;

  const [q, setQ] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    if (categorySlug && !routeFilter) {
      navigate("/products", { replace: true });
      return;
    }
  }, [categorySlug, routeFilter, navigate]);

  const list = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      if (routeFilter && !routeFilter.matches(p)) return false;
      if (!ql) return true;
      return (
        p.name.toLowerCase().includes(ql) ||
        (p.grade || "").toLowerCase().includes(ql) ||
        (p.tags || []).some((t) => t.includes(ql))
      );
    });
    return filtered;
  }, [q, routeFilter]);

  useEffect(() => {
    setVisibleCount(9);
  }, [routeFilter, q]);

  const visibleList = useMemo(
    () => list.slice(0, Math.min(visibleCount, list.length || 0)),
    [list, visibleCount]
  );

  const resultsLabel = list.length
    ? `Showing ${visibleList.length} of ${list.length} ${list.length === 1 ? "product" : "products"}`
    : "No products matched your filters";

  function handleShowMore() {
    setVisibleCount((prev) => Math.min(prev + 9, list.length));
  }

  return (
    <div className="products-page">
      <Hero
        title={routeFilter ? `Our ${routeFilter.label}` : "Our Product Portfolio"}
        subtitle={
          routeFilter
            ? `${routeFilter.tagline}`
            : "From advanced pellets to APIs, Rraynex delivers quality formulations engineered for global healthcare standards."
        }
        bgImage={routeFilter ? routeFilter.bgImage : "https://images.pexels.com/photos/3735764/pexels-photo-3735764.jpeg?auto=compress&cs=tinysrgb&w=1920"}
        plink="/products/categories/pellets"
        ptitle="Explore Products"
        slink="/assets/Rraynex_Corp_Profile.pdf"
        stitle="Download Brochure"
        overlayGradient="linear-gradient(to bottom right, rgba(0, 0, 0, 0.72), rgba(42, 42, 42, 0.9))"

      />

      <main id="products" className="products-shell">
        <header className="products-heading">
          <div>
            <span className="products-eyebrow">Product catalogue</span>
            <h1>{routeFilter ? routeFilter.label : "All Products"}</h1>
            <p className="products-summary">Pellets • Granules • APIs • Intermediates</p>
          </div>
          <div className="products-heading__actions">
            <Link className="btn btn-outline" to="/products/categories">
              Explore Categories
            </Link>
            <a className="btn btn-primary" href="mailto:communications@rraynex.com">
              Contact Sales
            </a>
          </div>
        </header>

        <nav className="products-menu" aria-label="Product families">
          {PRODUCT_MENU.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/products"}
              className={({ isActive }) =>
                [
                  "products-menu__link",
                  isActive ? "products-menu__link--active" : "",
                ].join(" ").trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <section className="products-panel" aria-label="Product search">
          <div className="products-panel__grid">
            <div className="products-field products-field--search">
              <label htmlFor="product-search">Search the catalogue</label>
              <input
                id="product-search"
                aria-label="Search products"
                placeholder="Search molecule, grade or tag"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
          <div className="products-panel__meta">
            <span className="products-count" aria-live="polite">
              {resultsLabel}
            </span>
          </div>
        </section>

        <section className="products-grid" aria-live="polite">
          {visibleList.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </section>

        {list.length > visibleList.length && (
          <div className="products-load-more">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}

        <section className="products-support" aria-label="Need assistance?">
          <div className="products-support__card">
            <div>
              <h2>Need formulation support?</h2>
              <p>
                Our technical specialists can help you with DMF access, stability data, custom strengths and
                regulatory documentation.
              </p>
            </div>
            <div className="products-support__actions">
              <a className="btn btn-primary" href="mailto:communications@rraynex.com">
                Email the Team
              </a>
              <a className="btn btn-outline" href="tel:+910000000000">
                Call +91 0000 000 000
              </a>
            </div>
          </div>
        </section>

        <footer className="products-footer">
          <small>
            Certifications: WHO-GMP, ISO 9001, ISO 14001. For DMF, VQM, TSE/BSE/MSDS and stability data please contact
            sales.
          </small>
        </footer>
      </main>
    </div>
  );
}