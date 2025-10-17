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
      "Direct compression granules supporting antipyretic and analgesic presentations. Optimised flow keeps high-speed tableting within weight variation limits.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "paracetamol"],
    image: "/assets/products/paracetamol.jpg",
  },
  {
    id: "granule-ibuprofen",
    slug: "product-ibuprofen-dc",
    name: "Ibuprofen DC",
    type: "Granules",
    family: "granules",
    category: "Analgesic",
    strengths: [],
    description:
      "Free-flowing ibuprofen granules built for direct compression of fast-acting pain relief tablets. Moisture-controlled processing protects API stability while keeping fines minimal.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "ibuprofen", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-metformin-hcl",
    slug: "product-metformin-hcl-dc",
    name: "Metformin HCl DC",
    type: "Granules",
    family: "granules",
    category: "Anti-Diabetic",
    strengths: [],
    description:
      "Direct compression metformin granules engineered to deliver tight bulk density and uniform blend behaviour for high-dose diabetes therapies.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "metformin", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-rosuvastatin",
    slug: "product-rosuvastatin-granules",
    name: "Rosuvastatin",
    type: "Granules",
    family: "granules",
    category: "Cardiovascular",
    strengths: [],
    description:
      "Statin granules supporting LDL-cholesterol management programs. Controlled particle size distribution simplifies low-dose blending and compression.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "rosuvastatin"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-azithromycin",
    slug: "product-azithromycin-dc",
    name: "Azithromycin DC",
    type: "Granules",
    family: "granules",
    category: "Antibiotic",
    strengths: [],
    description:
      "Macrolide granules manufactured for direct compression of high-load azithromycin tablets. Low moisture uptake preserves potency through global distribution.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "azithromycin", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-pantoprazole",
    slug: "product-pantoprazole-dc",
    name: "Pantoprazole DC",
    type: "Granules",
    family: "granules",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Acid-stable pantoprazole granules that compress directly into gastro-resistant tablets once enteric protection is applied downstream.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "pantoprazole", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-esomeprazole",
    slug: "product-esomeprazole-dc",
    name: "Esomeprazole DC",
    type: "Granules",
    family: "granules",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Direct compression esomeprazole granules with controlled residual solvents and narrow PSD, enabling robust PPI tablet manufacturing.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "esomeprazole", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-omeprazole",
    slug: "product-omeprazole-dc",
    name: "Omeprazole DC",
    type: "Granules",
    family: "granules",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Stabilised omeprazole granules for direct compression formats, ready for downstream enteric coating to deliver delayed gastric release.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "omeprazole", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-rabeprazole",
    slug: "product-rabeprazole-dc",
    name: "Rabeprazole DC",
    type: "Granules",
    family: "granules",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Rabeprazole granules engineered for rapid proton pump inhibition. Protective layering guards the benzimidazole core during high-shear blending.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "rabeprazole", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-atorvastatin",
    slug: "product-atorvastatin-dc",
    name: "Atorvastatin DC",
    type: "Granules",
    family: "granules",
    category: "Cardiovascular",
    strengths: [],
    description:
      "Atorvastatin granules designed for direct compression, balancing flow and compressibility to support low-dose statin tablets.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "atorvastatin", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-clopidogrel",
    slug: "product-clopidogrel-dc",
    name: "Clopidogrel DC",
    type: "Granules",
    family: "granules",
    category: "Anti-Platelet",
    strengths: [],
    description:
      "Direct compression clopidogrel granules that maintain chirality and content uniformity, enabling rapid scale-up of antiplatelet therapies.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "clopidogrel", "dc"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-paracetamol-ibuprofen",
    slug: "product-paracetamol-ibuprofen",
    name: "Paracetamol + Ibuprofen",
    type: "Granules",
    family: "granules",
    category: "Analgesic Combination",
    strengths: [],
    description:
      "Balanced dual-analgesic granules providing coordinated fever and pain relief. Harmonised density keeps both actives evenly distributed in every tablet.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "paracetamol", "ibuprofen", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-pantoprazole-domperidone",
    slug: "product-pantoprazole-domperidone-granules",
    name: "Pantoprazole + Domperidone",
    type: "Granules",
    family: "granules",
    category: "Gastroprokinetic",
    strengths: [],
    description:
      "Dual-action PPI and prokinetic granules formulated to stay uniform during blending, enabling fixed-dose reflux therapies with dependable disintegration.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "pantoprazole", "domperidone", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-rabeprazole-domperidone",
    slug: "product-rabeprazole-domperidone-granules",
    name: "Rabeprazole + Domperidone",
    type: "Granules",
    family: "granules",
    category: "Gastroprokinetic",
    strengths: [],
    description:
      "Stabilised rabeprazole and domperidone granules supporting coordinated acid suppression with antiemetic coverage for GERD patients.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "rabeprazole", "domperidone", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-omeprazole-domperidone",
    slug: "product-omeprazole-domperidone-granules",
    name: "Omeprazole + Domperidone",
    type: "Granules",
    family: "granules",
    category: "Gastroprokinetic",
    strengths: [],
    description:
      "Omeprazole and domperidone granules calibrated for equal bulk density, mitigating segregation risks in capsule and sachet formats.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "omeprazole", "domperidone", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-esomeprazole-domperidone",
    slug: "product-esomeprazole-domperidone-granules",
    name: "Esomeprazole + Domperidone",
    type: "Granules",
    family: "granules",
    category: "Gastroprokinetic",
    strengths: [],
    description:
      "Combination granules pairing esomeprazole with domperidone for reflux control and gastric motility support, ready for direct compression or filling.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "esomeprazole", "domperidone", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-clopidogrel-domperidone",
    slug: "product-clopidogrel-domperidone-granules",
    name: "Clopidogrel + Domperidone",
    type: "Granules",
    family: "granules",
    category: "Combination Therapy",
    strengths: [],
    description:
      "Dual-component granules combining platelet inhibition with prokinetic support for specialised cardiovascular-gastrointestinal regimens.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "clopidogrel", "domperidone", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-metformin-pantoprazole",
    slug: "product-metformin-pantoprazole-granules",
    name: "Metformin + Pantoprazole",
    type: "Granules",
    family: "granules",
    category: "Combination Therapy",
    strengths: [],
    description:
      "Metabolic and gastric protection granules supporting patients on long-term diabetes therapy who require PPI coverage. Balanced densities keep fill weights consistent.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "metformin", "pantoprazole", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-clopidogrel-pantoprazole",
    slug: "product-clopidogrel-pantoprazole-granules",
    name: "Clopidogrel + Pantoprazole",
    type: "Granules",
    family: "granules",
    category: "Combination Therapy",
    strengths: [],
    description:
      "Granules synchronising antiplatelet protection with gastric acid control, built to avoid segregation and maintain assay precision in dual-dose tablets.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "clopidogrel", "pantoprazole", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "granule-paracetamol-domperidone",
    slug: "product-paracetamol-domperidone",
    name: "Paracetamol + Domperidone",
    type: "Granules",
    family: "granules",
    category: "Combination Therapy",
    strengths: [],
    description:
      "Combination granules that pair analgesic relief with antiemetic support, crafted for paediatric and adult dispersible or tablet formats.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["granule", "paracetamol", "domperidone", "combination"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-2-mercapto-1h-benzimidazole",
    slug: "intermediate-2-mercapto-1h-benzimidazole",
    name: "2-Mercapto-1H-benzimidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "PPI Intermediate",
    cas: "583-39-1",
    strengths: [],
    description:
      "Sulfur-bearing benzimidazole intermediate supporting Lansoprazole, Rabeprazole, and Dexlansoprazole synthesis. Delivered with tight impurity and residual solvent controls for reliable PPI manufacturing (CAS 583-39-1). End use: Lansoprazole, Rabeprazole, Dexlansoprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "ppi", "lansoprazole", "rabeprazole", "dexlansoprazole", "cas-583-39-1"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-2-mercapto-5-methoxy-benzimidazole",
    slug: "intermediate-2-mercapto-5-methoxy-benzimidazole",
    name: "2-Mercapto-5-Methoxy benzimidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "PPI Intermediate",
    cas: "37052-78-1",
    strengths: [],
    description:
      "Key benzimidazole intermediate for methoxy-substituted proton pump inhibitors. Managed particle control and sulphur profile aid consistent downstream coupling (CAS 37052-78-1). End use: Lansoprazole, Rabeprazole, Dexlansoprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "ppi", "lansoprazole", "rabeprazole", "dexlansoprazole", "cas-37052-78-1"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-2-chloromethyl-4-methoxy-35-dimethylpyridine-hcl",
    slug: "intermediate-2-chloromethyl-4-methoxy-3-5-dimethylpyridine-hcl",
    name: "2-Chloromethyl-4-methoxy-3,5-dimethylpyridine HCl",
    type: "Intermediate",
    family: "intermediary",
    category: "Omeprazole Intermediate",
    cas: "86604-75-3",
    strengths: [],
    description:
      "Activated pyridine salt used in assembling the Omeprazole side chain. Controlled chloromethyl content and low colour ensure clean coupling reactions (CAS 86604-75-3). End use: Omeprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "omeprazole", "ppi", "cas-86604-75-3"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-5-methoxy-2-benzimidazole-pp",
    slug: "intermediate-5-methoxy-2-benzimidazole",
    name: "5-Methoxy-2-[[4-methoxy-3,5-dimethyl-2-pyridyl]methyl]thio benzimidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "Omeprazole Intermediate",
    cas: "73590-85-9",
    strengths: [],
    description:
      "Coupled benzimidazole intermediate feeding final Omeprazole formation. Produced under nitrogen with sulphide controls to minimise oxidative by-products (CAS 73590-85-9). End use: Omeprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "omeprazole", "ppi", "cas-73590-85-9"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-5-difluoromethoxy-2-mercaptobenzimidazole",
    slug: "intermediate-5-difluoromethoxy-2-mercaptobenzimidazole",
    name: "5-Difluoromethoxy-2-mercaptobenzimidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "Pantoprazole Intermediate",
    cas: "97963-62-7",
    strengths: [],
    description:
      "Difluoromethoxy benzimidazole scaffold enabling Pantoprazole sulphide formation. Managed fluoride content supports regulatory-compliant impurity profiles (CAS 97963-62-7). End use: Pantoprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "pantoprazole", "ppi", "cas-97963-62-7"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-pantoprazole-chloro",
    slug: "intermediate-2-chloromethyl-34-dimethoxypyridine-hcl",
    name: "2-(Chloromethyl)-3,4-dimethoxypyridine HCl",
    type: "Intermediate",
    family: "intermediary",
    category: "Pantoprazole Intermediate",
    cas: "72830-09-2",
    strengths: [],
    description:
      "Chloro pyridine intermediate (Pantoprazole chloro) optimised for high assay and controlled chloride levels, expediting nucleophilic substitution with benzimidazole partners (CAS 72830-09-2). End use: Pantoprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "pantoprazole", "ppi", "cas-72830-09-2"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-pantoprazole-sulfide",
    slug: "intermediate-5-difluoromethoxy-pantoprazole-sulfide",
    name: "5-(Difluoromethoxy)-2-[(3,4-dimethoxy-2-pyridinyl)methyl]thio-1H-benzimidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "Pantoprazole Intermediate",
    cas: "102625-64-9",
    strengths: [],
    description:
      "Pantoprazole sulphide intermediate manufactured under controlled oxidation states to facilitate clean sulfoxidation steps (CAS 102625-64-9). End use: Pantoprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "pantoprazole", "ppi", "cas-102625-64-9"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-5-ethoxy-2-mercaptobenzimidazole",
    slug: "intermediate-5-ethoxy-2-mercaptobenzimidazole",
    name: "5-Ethoxy-2-mercaptobenzimidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "CNS Intermediate",
    cas: "55489-15-1",
    strengths: [],
    description:
      "Ethoxy-substituted benzimidazole intermediate supporting Afobazol and Obenoxazine syntheses. Produced with low residual solvents to simplify downstream crystallisation (CAS 55489-15-1). End use: Afobazol, Obenoxazine.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "afobazol", "obenoxazine", "cas-55489-15-1"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-rabeprazole-chloro",
    slug: "intermediate-2-chloromethyl-4-3-methoxypropoxy-3-methylpyridine-hcl",
    name: "2-(Chloromethyl)-4-(3-methoxypropoxy)-3-methylpyridine HCl",
    type: "Intermediate",
    family: "intermediary",
    category: "Rabeprazole Intermediate",
    cas: "153259-31-5",
    strengths: [],
    description:
      "Activated pyridine salt that anchors Rabeprazole side-chain construction. Chloride and moisture controls deliver consistent coupling performance (CAS 153259-31-5). End use: Rabeprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "rabeprazole", "ppi", "cas-153259-31-5"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-rabeprazole-sulfide",
    slug: "intermediate-4-3-methoxypropoxy-rabeprazole-sulfide",
    name: "2-((((4-(3-methoxypropoxy)-3-methylpyridine-2-yl)methyl)thio)-1H-benzo[d]imidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "Rabeprazole Intermediate",
    cas: "117977-21-6",
    strengths: [],
    description:
      "Rabeprazole sulfide intermediate produced with controlled oxidation levels to streamline conversion to the sulfoxide API (CAS 117977-21-6). End use: Rabeprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "rabeprazole", "ppi", "cas-117977-21-6"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-lansoprazole-chloro",
    slug: "intermediate-2-chloromethyl-3-methyl-4-trifluoroethoxy-pyridine-hcl",
    name: "2-Chloromethyl-3-methyl-4-(2,2,2-trifluoroethoxy) pyridine HCl",
    type: "Intermediate",
    family: "intermediary",
    category: "Lansoprazole Intermediate",
    cas: "127337-60-4",
    strengths: [],
    description:
      "Trifluoroethoxy pyridine salt used in Lansoprazole coupling. Manufactured in controlled fluorination suites to assure assay stability (CAS 127337-60-4). End use: Lansoprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "lansoprazole", "ppi", "cas-127337-60-4"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-lansoprazole-sulfide",
    slug: "intermediate-2-3-methyl-trifluoroethoxy-pyridylmethylthio-benzimidazole",
    name: "2-[3-Methyl-4-(2,2,2-trifluoroethoxy)-2-pyridylmethylthio] benzimidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "Lansoprazole Intermediate",
    cas: "103577-40-8",
    strengths: [],
    description:
      "Lansoprazole sulfide intermediate controlled for polymorph and sulphide levels to drive efficient sulfoxidation (CAS 103577-40-8). End use: Lansoprazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "lansoprazole", "ppi", "cas-103577-40-8"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-n-45-dichloro-2-nitrophenyl-acetamide",
    slug: "intermediate-n-45-dichloro-2-nitrophenyl-acetamide",
    name: "N-(4,5 Dichloro-2-nitrophenyl) acetamide",
    type: "Intermediate",
    family: "intermediary",
    category: "Anthelmintic Intermediate",
    cas: "5462-30-6",
    strengths: [],
    description:
      "Chloro-nitro aromatic intermediate deployed in Triclabendazole manufacturing. Controlled chloride levels support downstream cyclisation (CAS 5462-30-6). End use: Triclabendazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "triclabendazole", "cas-5462-30-6"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-5-chloro-6-phenoxy-13-dihydrobenzimidazole-2-thion",
    slug: "intermediate-5-chloro-6-phenoxy-13-dihydrobenzimidazole-2-thion",
    name: "5-Chloro-6-(2,3-dichlorophenoxy)-1,3-dihydrobenzimidazole-2-thion",
    type: "Intermediate",
    family: "intermediary",
    category: "Anthelmintic Intermediate",
    cas: "68828-69-3",
    strengths: [],
    description:
      "Advanced benzimidazole intermediate tailored for Triclabendazole routes with low residual solvents and defined sulphur content (CAS 68828-69-3). End use: Triclabendazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "triclabendazole", "cas-68828-69-3"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-4-5-dichloro-2-nitroaniline",
    slug: "intermediate-4-5-dichloro-2-nitroaniline",
    name: "4,5-Dichloro-2-nitroaniline (4DNA)",
    type: "Intermediate",
    family: "intermediary",
    category: "Specialty Intermediate",
    cas: "6641-64-1",
    strengths: [],
    description:
      "Versatile chloro-nitro aniline intermediate meeting specifications for Maribavir and other specialty chemical programs (CAS 6641-64-1). End use: Maribavir and specialty chemicals.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "maribavir", "specialty", "cas-6641-64-1"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-4-5-dichlorobenzene-1-2-diamine",
    slug: "intermediate-4-5-dichlorobenzene-1-2-diamine",
    name: "4,5-Dichlorobenzene-1,2-diamine",
    type: "Intermediate",
    family: "intermediary",
    category: "Specialty Intermediate",
    cas: "5348-42-5",
    strengths: [],
    description:
      "Chloro diamine intermediate supporting benzimidazole and specialty heterocycle synthesis pathways (CAS 5348-42-5). End use: Specialty chemical synthesis.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "specialty", "benzimidazole", "cas-5348-42-5"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-3-nitrophthalic-acid",
    slug: "intermediate-3-nitrophthalic-acid",
    name: "3-Nitrophthalic Acid",
    type: "Intermediate",
    family: "intermediary",
    category: "Immunology Intermediate",
    cas: "603-11-2",
    strengths: [],
    description:
      "Aromatic acid intermediate serving Apremilast synthesis with controlled moisture and colour profiles (CAS 603-11-2). End use: Apremilast.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "apremilast", "cas-603-11-2"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-cndp",
    slug: "intermediate-4-chloro-3-nitro-2-6-dimethylpyridine",
    name: "4-Chloro-3-Nitro-2,6-Dimethyl pyridine (CNDp)",
    type: "Intermediate",
    family: "intermediary",
    category: "Anti-inflammatory Intermediate",
    cas: "15513-48-1",
    strengths: [],
    description:
      "Halogenated pyridine intermediate supporting Grapiprant development with low inorganic chloride and defined assay (CAS 15513-48-1). End use: Grapiprant.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "grapiprant", "anti-inflammatory", "cas-15513-48-1"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-diisopropylidene-fructopyranose",
    slug: "intermediate-2-3-4-5-di-o-isopropylidene-beta-d-fructopyranose",
    name: "2,3,4,5-Di-O-isopropylidene-β-D-Fructopyranose",
    type: "Intermediate",
    family: "intermediary",
    category: "Neurology Intermediate",
    cas: "20880-92-6",
    strengths: [],
    description:
      "Protected sugar intermediate tailored for Topiramate synthesis with controlled acetone content and optical purity (CAS 20880-92-6). End use: Topiramate.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "topiramate", "neurology", "cas-20880-92-6"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-2-chloro-5-nitro-benzoic-acid",
    slug: "intermediate-2-chloro-5-nitro-benzoic-acid",
    name: "2-Chloro-5-Nitro benzoic acid",
    type: "Intermediate",
    family: "intermediary",
    category: "Gastro Intermediate",
    cas: "2516-96-3",
    strengths: [],
    description:
      "Chloro-nitro benzoic acid intermediate produced to support Mesalamine and related aminosalicylate synthesis (CAS 2516-96-3). End use: Mesalamine.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "mesalamine", "cas-2516-96-3"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-5-nitrosalicylic-acid",
    slug: "intermediate-5-nitrosalicylic-acid",
    name: "5-Nitrosalicylic acid (2-Hydroxy-5-nitrobenzoic acid)",
    type: "Intermediate",
    family: "intermediary",
    category: "Gastro Intermediate",
    cas: "96-97-9",
    strengths: [],
    description:
      "Nitro salicylic acid intermediate aligned to 5-ASA derivative manufacturing with tightly controlled nitrite residuals (CAS 96-97-9). End use: Mesalamine and related aminosalicylates.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "mesalamine", "gastro", "cas-96-97-9"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-veratric-acid",
    slug: "intermediate-3-4-dimethoxy-benzoic-acid",
    name: "3,4-Dimethoxy benzoic acid (Veratric Acid)",
    type: "Intermediate",
    family: "intermediary",
    category: "GI Motility Intermediate",
    cas: "93-07-2",
    strengths: [],
    description:
      "Dimethoxy benzoic acid intermediate for Itopride and Mebeverine programmes with controlled colour and trace metals (CAS 93-07-2). End use: Itopride, Mebeverine.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "itopride", "mebeverine", "cas-93-07-2"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-bcba",
    slug: "intermediate-5-bromo-2-chlorobenzoic-acid",
    name: "5-Bromo-2-Chlorobenzoic acid (BCBA)",
    type: "Intermediate",
    family: "intermediary",
    category: "Cardiometabolic Intermediate",
    cas: "21739-92-4",
    strengths: [],
    description:
      "Halogenated benzoic acid intermediate leveraged in SGLT2 inhibitor synthesis with low biaryl impurities (CAS 21739-92-4). End use: Dapagliflozin / Empagliflozin.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "dapagliflozin", "empagliflozin", "sglt2", "cas-21739-92-4"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-sesamol",
    slug: "intermediate-3-4-methylenedioxy-phenol",
    name: "3,4-(Methylenedioxy)Phenol (Sesamol)",
    type: "Intermediate",
    family: "intermediary",
    category: "CNS Intermediate",
    cas: "533-31-3",
    strengths: [],
    description:
      "Methylenedioxy phenol intermediate supporting Paroxetine synthesis with colour and peroxide limits for clean downstream reactions (CAS 533-31-3). End use: Paroxetine.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "paroxetine", "cas-533-31-3"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-n-acetyl-glycine",
    slug: "intermediate-n-acetyl-glycine",
    name: "N-Acetyl Glycine",
    type: "Intermediate",
    family: "intermediary",
    category: "Veterinary Intermediate",
    cas: "543-24-8",
    strengths: [],
    description:
      "Amino acid derivative intermediate produced for Diminazene programmes with strict bioburden control (CAS 543-24-8). End use: Diminazene.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "diminazene", "veterinary", "cas-543-24-8"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-p-nitro-benzamidoxime",
    slug: "intermediate-p-nitro-benzamidoxime",
    name: "p-Nitro benzamidoxime (DMZ)",
    type: "Intermediate",
    family: "intermediary",
    category: "Veterinary Intermediate",
    cas: "1613-86-1",
    strengths: [],
    description:
      "Nitro amidoxime intermediate aligned to Diminazene synthesis with controlled hydroxylamine residues (CAS 1613-86-1). End use: Diminazene.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "diminazene", "veterinary", "cas-1613-86-1"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-4-nitro-imidazole",
    slug: "intermediate-4-nitro-imidazole",
    name: "4-Nitro imidazole",
    type: "Intermediate",
    family: "intermediary",
    category: "Anti-infective Intermediate",
    cas: "3034-38-6",
    strengths: [],
    description:
      "Nitro imidazole intermediate built for Nimorazole and related anti-infective programmes with controlled particle size and moisture (CAS 3034-38-6). End use: Nimorazole.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "nimorazole", "anti-infective", "cas-3034-38-6"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "intermediate-3-methyl-xanthine",
    slug: "intermediate-3-methyl-xanthine",
    name: "3-Methyl Xanthine",
    type: "Intermediate",
    family: "intermediary",
    category: "Stimulant Intermediate",
    cas: "1076-22-8",
    strengths: [],
    description:
      "Purine intermediate enabling Theobromine and related xanthine derivative manufacture, supplied with tight caffeine limits (CAS 1076-22-8). End use: Theobromine.",
    grade: "Custom / On Request",
    unit: "5/25 kg",
    tags: ["intermediate", "theobromine", "stimulant", "cas-1076-22-8"],
    image: "/assets/products/placeholder.jpg",
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
    id: "api-pantoprazole",
    slug: "product-api-pantoprazole",
    name: "Pantoprazole (API)",
    type: "API",
    family: "api",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "High-purity pantoprazole sodium sesquihydrate meeting major pharmacopoeial specifications. Controlled particle size supports pelletisation, tablet, and injectable development pipelines.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["api", "pantoprazole"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "api-rabeprazole",
    slug: "product-api-rabeprazole",
    name: "Rabeprazole (API)",
    type: "API",
    family: "api",
    category: "Anti-Ulcerant",
    strengths: [],
    description:
      "Benzoimidazole-class PPI API manufactured under WHO-GMP. Offers low related substances and is optimised for rapid conversion to enteric pellets or tablets.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["api", "rabeprazole"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "api-fluconazole",
    slug: "product-api-fluconazole",
    name: "Fluconazole (API)",
    type: "API",
    family: "api",
    category: "Anti-fungal",
    strengths: [],
    description:
      "Triazole antifungal API with validated controls on isomer and solvent content. Supports capsule, tablet, and IV dosage manufacturing for systemic mycoses.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["api", "fluconazole"],
    image: "/assets/products/placeholder.jpg",
  },
  {
    id: "api-mebendazole",
    slug: "product-api-mebendazole",
    name: "Mebendazole (API)",
    type: "API",
    family: "api",
    category: "Anthelmintic",
    strengths: [],
    description:
      "Broad-spectrum anthelmintic API processed to deliver excellent polymorphic stability and tight assay results for chewable or solid oral dose forms.",
    grade: "IP / BP / USP / EP",
    unit: "25/50 kg",
    tags: ["api", "mebendazole"],
    image: "/assets/products/placeholder.jpg",
  },
];

const PRODUCT_NARRATIVES = {
  "product-aspirin": [
    `Aspirin is a time-tested, over-the-counter medication formulated to relieve pain, reduce fever, and combat inflammation. Containing acetylsalicylic acid, it works by inhibiting substances in the body responsible for pain, swelling, and blood clot formation. Widely recommended by healthcare professionals, Aspirin is also used in low doses to support cardiovascular health and help reduce the risk of heart attack or stroke.

Key Benefits:

Effective Pain Relief: Provides fast, reliable relief from headaches, muscle pain, toothaches, menstrual cramps, and minor arthritis discomfort.

Anti-Inflammatory Action: Reduces inflammation and swelling associated with various conditions.

Fever Reduction: Helps lower body temperature during fever episodes.

Heart Health Support: Low-dose Aspirin may help prevent blood clots, lowering the risk of heart attack and stroke (as directed by a doctor).

Proven and Trusted: Backed by decades of clinical use and trusted by millions worldwide for its safety and effectiveness.

Usage Note:
Use only as directed. Consult a healthcare provider before using Aspirin for long-term cardiovascular protection or if you have any pre-existing medical conditions.`
  ],
  "product-clopidogrel": [
    `Clopidogrel pellets from Rraynex support secondary prevention programs that rely on dependable ADP receptor blockade. We start with pharmacopeial-grade clopidogrel bisulfate and convert it through closed granulation trains that protect chirality and particle integrity. Layering operations are tuned to maintain uniform weight gain across multi-kilogram batches, so fixed-dose combinations carry the same exposure profile as single-ingredient capsules. Inline humidity and temperature mapping ensures the prodrug remains stable during processing, while low residual-solvent coatings preserve the delicate conversion pathway that activates clopidogrel in vivo. Pellets are sized within a narrow span to safeguard blend uniformity during downstream filling and to minimize dust generation.`,
    `Documentation packages provide comparative dissolution against originator references under multiple pH conditions, alongside nitrosamine risk evaluations and per-lot stability data. Customers can choose moisture-barrier drums or tamper-evident polymer bags that survive intercontinental shipping without caking. Our technical services team supports scale-up, offering guidance on capsule fill weight adjustments, gastro-resistant layering, or customized lubricant blends to reach target disintegration times. For markets demanding stringent pharmacovigilance we maintain change-control logs and audit trails ready for inclusion in CTD, ACTD, or eCTD submissions. The result is a cooperative supply partnership that keeps dual antiplatelet therapy lines responsive to hospital and tender demand.`
  ],
  "product-clopidogrel-aspirin": [
  `Clopidogrel + Aspirin pellets unify two established cardioprotective actives within one multi-unit platform. Rraynex sequences deposition steps so that aspirin cores receive protective sealing before clopidogrel layering begins, limiting cross-reactivity and enabling uniform dissolution of both agents. Particle size distribution is calibrated to keep density similar across the dual population, preserving homogeneity during capsule filling and sachet dosing. In-process analytics monitor individual assays, residual solvents, and moisture to ensure each component stays within pharmacopeial limits, while accelerated stability stress tests confirm compatibility through 40 degrees Celsius and 75 percent relative humidity exposure.`,
    `To simplify regulatory filings, our technical dossier maps critical process parameters for each active, provides simultaneous dissolution curves, and includes supportive excipient compatibility studies. Customers receive guidance on optimizing final blends, whether pursuing gastro-resistant capsules, sprinkle sachets, or modified-release once-daily tablets. Packaging teams can request segregated drum compartments or co-filled barrier bags, both validated for global shipping lanes. Lifecycle support covers nitrosamine risk assessments, analytical method transfers, and rapid change-control communication so product managers can respond quickly to hospital formularies. The combined platform helps manufacturers deliver dual antiplatelet therapy with streamlined operations and audit-ready rigor.`
  ],
  "product-duloxetine": [
    `Duloxetine pellets are engineered to support serotonin-norepinephrine reuptake inhibitor therapies that rely on dependable enteric protection. Starting with pharmacopeial-grade duloxetine hydrochloride, we leverage solvent layering and precision spheronisation to create pellets with uniform density and low friability. Enteric coatings are tuned to delay release until higher intestinal pH levels, safeguarding against gastric degradation while promoting predictable absorption. Process analytical technology tracks moisture, assay, and coating thickness in real time, giving formulators confidence that each batch will meet dissolution targets for depression, neuropathic pain, and anxiety indications.`,
    `Commercial partners receive comprehensive data packs that include comparative dissolution, impurity profiles, and accelerated stability across multiple climates. We can fine-tune pellet diameter to suit capsule fills or compression-based multiparticulate tablets, and packaging choices range from 25 kilogram drum liners to smaller nitrogen-flushed bags for clinical launches. Technical liaisons support method transfers, solvent residue validations, and compatibility studies with excipients such as HPMC, methacrylic acid copolymers, or microcrystalline cellulose. With responsive quality systems and transparent change-control governance, Rraynex keeps duloxetine supply chains predictable for both emerging and regulated markets.`
  ],
  "product-dexlansoprazole": [
    `Dexlansoprazole DDR pellets deliver sequential release pulses designed to extend proton pump inhibition through the entire dosing interval. Our dual-layer process deposits two discrete enteric coatings with controlled dissolution thresholds, creating the signature dual delayed-release pharmacokinetic curve. Each pellet is monitored for size distribution, density, and surface integrity to ensure consistent behavior during capsule filling or sachet presentations. Rigorous in-process controls verify assay targets, residual solvents, and moisture, while stability programs simulate both temperate and tropical climates to confirm the layered architecture resists degradation.`,
  `Customers gain access to detailed process descriptions, dissolution profiles at multiple pH stages, and migration data that demonstrate the independence of each release layer. We support method transfers for HPLC assay and related substances, provide nitrosamine risk assessments, and offer assistance with bioequivalence study planning. Packaging is customizable - moisture-barrier drums, foil-lined bags, or nitrogen-purged containers - each qualified for long-haul logistics. Dedicated technical teams stay engaged through validation, scale-up, and post-market lifecycle management, ensuring Dexlansoprazole DDR products reach patients with the consistency regulators expect.`
  ],
  "product-esomeprazole-ec": [
    `Esomeprazole EC pellets are produced with a focus on acid resistance and rapid transition into commercial dosage forms. We begin with pharmacopeial esomeprazole magnesium trihydrate, apply a sealing coat to protect the core, and then lay down enteric polymers that dissolve precisely at small intestinal pH. Tight control over pellet sizing and moisture keeps flow properties stable, giving formulators freedom to select capsules, sachets, or multiparticulate tablets. Extensive in-process analytics track assay uniformity, loss on drying, and coating thickness so gastro-resistant performance remains consistent across strength variants.`,
  `Our dossier package includes comparative dissolution at pH 6.8 and 7.4, photostability results, impurity trends, and packaging validation reports. Technical experts assist with method transfer, stability study design, and fine-tuning of capsule lubrication to achieve target disintegration. With flexible packaging - from 25 kilogram drums to small development lots - we support both pilot and commercial scale. Change-control pathways keep customers informed about excipient upgrades or equipment qualifications, ensuring submissions to regulated markets proceed without delays. Esomeprazole EC pellets from Rraynex help brands deliver dependable proton pump inhibitor therapy backed by transparent quality governance.`
  ],
  "product-esomeprazole-magnesium": [
    `Esomeprazole Magnesium Trihydrate pellets combine high acid resistance with the solubility profile required for chronic GERD management. Raw materials are sourced against IP, BP, USP, and EP specifications and converted in enclosed systems that protect against humidity spikes. The magnesium salt delivers improved stability, so we employ layered coatings that maintain low degradation products even under harsh stability testing. Pellets are spheronised to a narrow distribution, reducing segregation during capsule filling and improving mouthfeel for sprinkle-on-food presentations. Each batch receives exhaustive in-process checks on assay, related substances, and mechanical robustness.`,
    `Clients receive a comprehensive technical file detailing solvent usage, residual limits, and dissolution against multiple media including simulated gastric fluid. Optional sub-coatings, color identifiers, or taste-masking layers can be introduced without compromising release profiles, with full change-control documentation supplied. Packaging programs cover moisture-proof drums, aluminum-lined bags, and customized small packs for development studies. Lifecycle services include method transfer support, process validation assistance, and rapid responses to regulatory authority queries. Choosing Rraynex for Esomeprazole Magnesium pellets ensures a stable, audit-ready supply built around collaborative technical engagement.`
  ],
  "product-esomeprazole-levosulpiride": [
    `Esomeprazole + Levosulpiride pellets provide simultaneous acid suppression and prokinetic support for complex upper GI indications. Our manufacturing sequence isolates each active during layering, employing barrier coats to prevent interaction and to keep assays within tight acceptance criteria. Pellets are engineered for matched density so the dual population remains homogeneous during blending, filling, or sachet dosing. Dissolution testing verifies coordinated release, with esomeprazole protected through enteric coatings while levosulpiride is presented for earlier gastric availability. Robust stability programs demonstrate that both actives meet impurity thresholds through long-term and accelerated studies.`,
  `Rraynex supplies full documentation including dual-API dissolution curves, excipient compatibility data, and validated analytical methods for simultaneous quantification. Customers can request tailored packaging - segregated drum compartments or unified barrier bags - each qualified for global shipping. Our formulation support team advises on capsule size selection, flavor masking for sprinkle formats, and lubricant choices that maintain content uniformity. Change-control governance keeps partners informed about process enhancements, while regulatory specialists prepare CTD-ready modules for agency submission. The combined platform gives commercial teams a reliable route to differentiated GERD and dyspepsia therapies.`
  ],
  "product-esomeprazole-domperidone": [
    `Esomeprazole + Domperidone pellets are built for patients needing both proton pump inhibition and relief from reflux-associated nausea. We orchestrate layering to shield esomeprazole with enteric polymers while delivering domperidone in an earlier release fraction, balancing pH-triggered delivery with prokinetic onset. Pellets undergo density harmonization so the dual active blend flows uniformly and resists segregation in high-speed capsule machines. Quality teams monitor residual solvents, assay, and mechanical durability at multiple checkpoints, ensuring each lot withstands shipping and downstream processing.`,
    `Detailed dossiers cover combined dissolution behavior, impurity management, and compatibility with commonly used excipients such as MCC, mannitol, and HPMC capsules. Packaging specialists offer moisture-safe drums, smaller barrier bags, or nitrogen-flushed containers for long voyages. Technical support spans method transfer, validation protocol drafting, and troubleshooting during scale-up or market expansions. We maintain proactive regulatory communication, updating partners about process improvements and ensuring CTD submissions remain current. With this dual-action pellet platform, manufacturers can launch or expand combination GERD therapies without compromising on quality assurance.`
  ],
  "product-itraconazole": [
    `Itraconazole pellets deliver antifungal coverage in a multiparticulate format that supports systemic therapy and localized gastrointestinal indications. Rraynex leverages fluid bed coating to distribute itraconazole uniformly across inert cores, followed by polymer layering that enhances dissolution in acidic and neutral environments. Particle size and sphericity are carefully controlled, delivering smooth flow for capsule filling and minimal dust formation in contained suites. Robust in-process controls track potency, residual solvent, and pellet friability to maintain performance during global transport.`,
    `Clients obtain comprehensive technical dossiers featuring dissolution data in simulated gastric and intestinal fluids, stability profiles under climatic zones II through IV, and validated analytical methods for related substances. Packaging can be tailored to clinical, commercial, or contract-manufacturing needs, with options including foil-lined drums, HDPE pails, or small research lots. Technical partnerships encompass method transfer assistance, taste-masking evaluations, and guidance on capsule shell selection for humid geographies. With transparent change-control records and quick-response quality teams, Rraynex keeps itraconazole supply dependable for antifungal portfolios worldwide.`
  ],
  "product-lansoprazole": [
    `Lansoprazole pellets from Rraynex offer rapid acid control supported by enteric coatings that withstand harsh gastric environments. Manufacturing begins with pharmacopeial-grade active material, processed in contained equipment to protect the benzimidazole structure from oxidative stress. Pellets undergo layering that balances seal coats, drug deposition, and enteric polymers, preserving low ash content for clean downstream compression. Particle size distribution remains tight, enabling high-speed capsule filling without segregation or dusting. Each batch is scrutinized for assay, moisture, and dissolution in acidic and neutral media to guarantee robust proton pump inhibition.`,
    `Commercial partners receive data packs featuring comparative dissolution against reference products, stability studies across climatic zones, and nitrosamine risk assessments. We offer packaging choices from moisture-barrier drums to nitrogen-flushed bags sized for clinical trials or hospital repacks. Technical support includes method transfers, compatibility studies with disintegrants, and recommendations for capsule shell selection when pursuing fast-disintegrating presentations. With our responsive quality management system and transparent change-control processes, lansoprazole supply from Rraynex remains consistent as brands expand into new geographies or line extensions.`
  ],
  "product-levosulpiride": [
    `Levosulpiride SR pellets are crafted to support prokinetic and antipsychotic regimens that demand controlled release. We select high-purity levosulpiride and employ solvent layering to achieve uniform deposition across inert cores, followed by polymer coats that stage the release profile over the dosing interval. Tight size control maintains flow in capsule and sachet applications, while low friability protects pellets during high-shear blending. Comprehensive in-process testing verifies assay uniformity, moisture levels, and dissolution to ensure the sustained-release curve remains within specification.`,
    `Partners benefit from detailed product dossiers containing dissolution comparisons, impurity trending, and accelerated stability data through multiple climates. Packaging solutions include moisture-protected drums, foil-lined bags, and custom small packs for clinical development. Process engineers and formulation scientists receive support on capsule fill optimization, lubricant choices, and blending strategies that maintain content uniformity. Change-control communication keeps regulatory filings current, while lifecycle services help customers plan post-approval improvements. Rraynex provides a dependable route to levosulpiride sustained-release supply with audit-ready documentation and collaborative technical engagement.`
  ],
  "product-mebeverine": [
    `Mebeverine pellets offer antispasmodic relief for irritable bowel syndrome and gastrointestinal cramping, leveraging controlled release to extend symptom management. Rraynex manufactures the pellets with precision layering that balances rapid onset and sustained delivery, using pharmacopeial-grade mebeverine hydrochloride and inert cores. Process controls monitor particle size, coating thickness, and residual solvents, resulting in pellets that flow cleanly through capsule fillers or sachet packaging. Stability programs replicate diverse climates to confirm that potency and dissolution remain within specification over the product lifecycle.`,
    `Every shipment is accompanied by comprehensive technical documentation, including dissolution profiles, impurity analyses, and nitrosamine risk assessments. Packaging can be configured in moisture-resistant drums, foil-lined bags, or smaller quantities suitable for pilot studies. Our technical support team collaborates on method transfer, excipient compatibility, and capsule shell selection, offering guidance to maintain rapid disintegration while minimizing taste impact. Change-control transparency ensures regulatory submissions stay current, enabling customers to supply IBS therapies across hospitals, retail pharmacies, and export markets with confidence.`
  ],
  "product-nifedipine": [
    `Nifedipine SR pellets underpin calcium-channel-blocker regimens that require smooth plasma levels for chronic hypertension management. Rraynex employs solvent layering to deposit nifedipine uniformly, followed by polymer coatings that modulate release over 12 to 24 hours. Pellets are sized within narrow tolerances and exhibit low friability, supporting automated capsule filling and compatibility with multiparticulate tablets. Real-time analytics track assay, moisture, and dissolution to guarantee each lot delivers the intended sustained-release profile, even after extended storage.`,
  `Customers receive extensive technical documentation, including dissolution comparisons at multiple pH levels, accelerated stability outcomes, and validated analytical procedures for related substances. Packaging versatility - moisture-safe drums, nitrogen-flushed bags, or pilot-scale packs - allows easy integration into supply chains. Our technical teams advise on capsule lubricant optimization, blend uniformity strategies, and bioequivalence study planning. With proactive change-control communication and audit-ready records, Rraynex keeps nifedipine sustained-release supply dependable for domestic and international cardiovascular portfolios.`
  ],
  "product-omeprazole": [
    `Omeprazole EC pellets are tuned for GERD, erosive esophagitis, and H. pylori regimens, keeping acid uptake below pharmacopeial limits while supporting multiple dosage formats. Manufacturing combines inert core preparation, active layering, and enteric coating under tightly controlled humidity to protect the acid-labile benzimidazole. Pellets exhibit narrow size distribution and low ash content, enabling smooth capsule filling, MUPS compression, or sachet use. In-process analytics monitor assay, loss on drying, and coating thickness, ensuring reliable gastric resistance across strengths.`,
    `Rraynex provides comprehensive data packages covering dissolution in acidic and neutral media, impurity trends, and stability studies through climatic zones II to IV. Packaging choices range from 25 kilogram drums to foil-lined bags, each validated for international shipping. Technical liaisons assist with method transfer, capsule formulation, and compatibility checks for excipients such as HPMC, MCC, or sucralose-based flavor systems. Transparent change-control processes keep regulatory files current, helping partners launch or expand omeprazole offerings without supply-chain surprises.`
  ],
  "product-omeprazole-domperidone-10": [
    `Omeprazole + Domperidone (20 mg + 10 mg) pellets are designed for patients who need acid suppression alongside relief from reflux-associated nausea. Rraynex sequences production so omeprazole receives a moisture-resistant seal and enteric coat before domperidone layering, preventing interactions and maintaining independent dissolution profiles. Pellets are balanced for density and size to ensure homogeneous blends during capsule filling and sachet packing. Quality checkpoints verify assay, residual solvents, and mechanical integrity, safeguarding performance during global distribution.`,
    `Technical files include dual-API dissolution curves, impurity profiles, and stability data across varied climates, simplifying combination-product submissions. Packaging engineers can select co-packed drums, segregated liners, or smaller barrier bags tailored to forecast volume. Our formulation team supports lubricant optimization, capsule shell selection, and sprinkle formulation development, while regulatory specialists prepare CTD-ready documentation. With responsive change-control and customer service, Rraynex keeps dual-action reflux therapies supplied without compromising quality assurance.`
  ],
  "product-omeprazole-domperidone-30": [
    `Omeprazole + Domperidone (20 mg + 30 mg) pellets extend the prokinetic component for patients requiring stronger motility support. Manufacturing mirrors our standard combination process, employing protective seal coats, controlled layering, and enteric polymers that safeguard omeprazole until intestinal transit while presenting domperidone for earlier release. Pellets are harmonized for density, allowing even distribution in capsules or stick packs despite the higher domperidone load. Extensive in-process testing watches assay, moisture, and friability to protect the dual therapeutic profile.`,
    `Customers receive detailed documentation with dissolution comparisons, interaction studies, and stability data that confirm both actives remain within specification across harsh climates. Packaging formats include barrier drums, nitrogen-flushed bags, and pilot-scale quantities for new market entry. Our technical teams advise on bioequivalence planning, lubricant systems, and excipient compatibility so that higher domperidone strengths integrate smoothly into existing production lines. With rigorous quality oversight and proactive communication, Rraynex supports global access to enhanced reflux management therapies.`
  ],
  "product-orlistat": [
    `Orlistat pellets deliver lipase inhibition for obesity management programs that require reliable gastrointestinal targeting. Rraynex prepares pellets using solvent layering and controlled drying, ensuring the active remains evenly distributed and within potency limits. Protective coatings minimize oily spotting and help the active survive capsule filling, stick packs, or sachet presentations. Particle size control delivers smooth flow through high-speed equipment while maintaining low dust levels for operator safety.`,
    `Documentation packages provide dissolution behavior in simulated intestinal fluid, impurity trends, and stability data across temperate and tropical climates. We offer packaging options from moisture-resistant drums to small nitrogen-flushed bags for pilot launches. Technical partners receive support on capsule fill optimization, flavor masking, and excipient compatibility, including blends with cellulose, mannitol, or silicon dioxide. With strong change-control governance and rapid quality responses, Rraynex keeps orlistat supply dependable as brands expand weight-management portfolios.`
  ],
  "product-pantoprazole": [
    `Pantoprazole pellets from Rraynex underpin a broad portfolio of proton pump inhibitor therapies that call for multiple strengths. Manufacturing starts with pharmacopeial pantoprazole sodium sesquihydrate processed in humidity-controlled suites. Seal coats, drug layering, and enteric polymers are carefully sequenced to protect the acid-labile core while delivering low ash content for downstream compression. Pellets exhibit consistent size distribution, supporting MUPS tablets, capsules, or sachet formulations without segregation. Quality monitoring covers assay, moisture, and dissolution across strengths to maintain predictable gastric resistance.`,
    `We supply detailed technical information encompassing dissolution comparisons, impurity trend analyses, and stability data aligned to ICH zones. Packaging is flexible, with moisture-barrier drums, foil-lined bags, and pilot-scale packs available to match forecast demand. Technical teams assist with method transfers, lubricant selection, and compatibility evaluations with excipients such as MCC, crospovidone, or mannitol. Regulatory specialists maintain ready-to-file CTD modules and transparent change-control logs, allowing customers to launch or scale pantoprazole products efficiently.`
  ],
  "product-pantoprazole-domperidone": [
    `Pantoprazole + Domperidone pellets deliver coordinated acid suppression and antiemetic support for persistent reflux sufferers. We apply seal coats to pantoprazole cores before layering domperidone, ensuring each active retains its intended release profile. Pellets are tuned for density uniformity, enabling homogeneous blends in capsules or stick packs. Extensive in-process checks monitor assay, residual solvent, and mechanical resilience, guaranteeing the combination withstands shipping and downstream handling.`,
    `Customers receive comprehensive dossiers detailing simultaneous dissolution curves, impurity control, and accelerated stability. Packaging configurations include co-packed drums, segregated liners, or smaller barrier bags for targeted launches. Our technical specialists advise on capsule sizing, blend lubrication, and sprinkle formulation, while regulatory teams keep CTD documentation current. Rraynex maintains open change-control communication, helping partners deliver dual-action reflux therapies with confidence in quality and compliance.`
  ],
  "product-pantoprazole-levosulpiride": [
    `Pantoprazole + Levosulpiride pellets serve gastroenterology and functional dyspepsia programs seeking combined acid suppression and prokinetic action. Production isolates each API during layering, using barrier coats to avoid interaction and preserve assays. Pellets are harmonized for density and particle size, reducing segregation risk in capsules or sachet formats. Dissolution testing validates staggered release profiles, with pantoprazole protected until intestinal pH while levosulpiride becomes available earlier to stimulate motility.`,
    `Technical documentation covers dual-API dissolution curves, excipient compatibility, and stability performance across multiple climates. Packaging options span moisture-proof drums, nitrogen-flushed bags, and smaller development packs. Our formulation support team helps customers design capsule fills, sprinkle presentations, or orally disintegrating formats while maintaining content uniformity. Regulatory partners receive CTD-ready modules and transparent change-control updates, streamlining market entry for combined reflux and motility products.`
  ],
  "product-rabeprazole-ec": [
    `Rabeprazole EC pellets provide rapid proton pump inhibition with robust gastro-resistance for erosive esophagitis and ulcer management. Manufacturing employs seal coats, active layering, and enteric polymers applied under tightly controlled humidity to protect the benzimidazole from degradation. Pellets are spheronised for uniform size and low friability, ensuring consistent flow in capsule filling and MUPS compression. Quality checks confirm assay, moisture, and dissolution in acidic and neutral media, supporting predictable clinical performance.`,
  `Our dossier includes comparative dissolution against reference products, stability results across climatic zones, and nitrosamine risk evaluations. Packaging options - from moisture-barrier drums to smaller foil-lined bags - are validated for global logistics. Technical teams assist with method transfers, capsule formulation, and compatibility assessments with excipients like MCC, povidone, or talc. Change-control transparency and responsive quality support keep rabeprazole supply reliable for brands serving multiple geographies.`
  ],
  "product-rabeprazole-sodium": [
    `Rabeprazole Sodium EC pellets offer the sodium salt’s fast onset in a gastro-resistant multiparticulate format. Rraynex processes the active under controlled conditions to prevent oxidative degradation, then applies seal and enteric coats that preserve potency while ensuring timed intestinal release. Pellets achieve tight particle size distribution, promoting uniform flow through capsule fillers and compatibility with sachet presentations. Continuous analytics track assay, moisture, and dissolution to maintain consistent acid suppression performance.`,
    `Customers receive comprehensive technical data, including dissolution comparisons, impurity profiles, and stability results across ICH zones. Packaging configurations such as moisture-resistant drums, nitrogen-flushed bags, or pilot-scale packs accommodate diverse commercial needs. Our technical experts guide blend optimization, lubricant choices, and regulatory documentation preparation. With proactive change-control communication and audit-ready files, Rraynex supports dependable rabeprazole sodium supply for global markets.`
  ],
  "product-rabeprazole-domperidone": [
    `Rabeprazole + Domperidone pellets combine potent acid suppression with antiemetic support for comprehensive reflux management. Production sequencing shields rabeprazole with enteric coatings while presenting domperidone for earlier gastric release, achieving coordinated therapeutic action. Pellets are balanced for density and size to keep blends homogeneous in capsules or sachets. Rigorous in-process controls watch assay, residual solvent, moisture, and friability, ensuring the dual formulation remains stable during storage and transport.`,
    `Regulatory dossiers feature simultaneous dissolution, compatibility studies, and stability data under accelerated conditions. Packaging offerings include co-packed drums, segregated compartments, or barrier bags sized to forecast demand. Technical teams assist with method transfers, capsule shell selection, and sprinkle-format development, while regulatory specialists maintain CTD-ready modules. Rraynex’s collaborative quality system keeps rabeprazole-domperidone supply responsive to physician demand and market expansion.`
  ],
  "product-rabeprazole-levosulpiride": [
    `Rabeprazole + Levosulpiride pellets deliver dual relief for GERD patients needing acid control and prokinetic support. Rraynex isolates each API during layering, employing sealing coats and density harmonization to maintain uniform distribution. Dissolution testing confirms rabeprazole remains gastro-resistant while levosulpiride becomes available earlier to encourage motility. Pellets are monitored for assay, moisture, and mechanical strength to withstand downstream processing.`,
  `Customers gain access to technical files covering dual-API dissolution, stability across multiple climates, and excipient compatibility insights. Packaging is adaptable - moisture-barrier drums, nitrogen-flushed bags, or pilot quantities - each validated for logistics. Our formulation advisors support capsule fill tuning, lubricant selection, and sprinkle-format innovation. Regulatory teams maintain CTD-ready data sets and transparent change-control notices, helping brands launch combined reflux therapies efficiently.`
  ],
  "product-diltiazem": [
    `Diltiazem FR/SR pellets supply flexible release kinetics for angina and hypertension management. Rraynex manufactures immediate- and sustained-release fractions using solvent layering and polymer coatings that modulate drug release across the dosing interval. Pellets are harmonized for size and density to maintain blend uniformity in capsules or multiparticulate tablets. Comprehensive in-process checks verify assay, moisture, and dissolution, ensuring both fast- and sustained-release components behave predictably.`,
  `We provide extensive technical documentation containing dissolution profiles for each release fraction, impurity data, and stability results for varied climatic zones. Packaging choices - from moisture-resistant drums to small research packs - accommodate commercial, hospital, or clinical trial supply. Technical teams assist with blend optimization, capsule fill strategies, and bioequivalence study planning, while regulatory specialists prepare CTD-compatible modules. With open change-control governance and responsive quality systems, Rraynex keeps diltiazem supply dependable throughout the product lifecycle.`
  ],
  "product-rosuvastatin": [
    `Rosuvastatin pellets cater to lipid-lowering regimens that demand consistent reduction in LDL cholesterol. Starting with pharmacopeial-grade rosuvastatin calcium, we employ solvent layering to achieve uniform deposition, followed by protective coats that guard against photolysis and oxidation. Pellets are spheronised to a tight distribution, enabling smooth capsule filling or integration into multiparticulate tablets. Process analytics monitor potency, residual solvents, and dissolution so each lot maintains the pharmacokinetic profile clinicians expect.`,
    `Customers receive full technical dossiers with dissolution comparisons, impurity trending, and stability outcomes across climates. Packaging options include moisture-barrier drums, foil-lined bags, and development-scale packs. Technical liaisons support method transfer, excipient compatibility assessments, and scale-up planning for high-speed capsule lines. With proactive change-control communication and robust quality governance, Rraynex ensures rosuvastatin pellet supply remains reliable for cardiovascular portfolios.`
  ],
  "product-tamsulosin-dutasteride-02": [
    `Tamsulosin + Dutasteride (0.2% + 0.5%) pellets target lower-dose benign prostatic hyperplasia therapy by combining alpha-blocker relief with 5-alpha-reductase inhibition. Rraynex sequences layering to stabilize each active, employing seal coats that prevent cross-reactivity and maintain potency. Pellets are controlled for size and density, delivering uniform blends in capsules or sachet presentations. Continuous analytics track assay, moisture, and dissolution to protect therapeutic performance throughout distribution.`,
    `Technical documentation includes dual-API dissolution curves, impurity profiles, and stability data that address combination-product requirements. Packaging configurations span co-packed drums, segregated liners, and small pilot lots for market testing. Our technical team advises on capsule shell selection, blend lubrication, and sprinkle-format development, while regulatory specialists prepare CTD-ready submissions. With responsive quality management, Rraynex supports dependable rollout of lower-dose BPH therapies.`
  ],
  "product-tamsulosin-dutasteride-04": [
    `Tamsulosin + Dutasteride (0.4% + 0.5%) pellets provide the higher-strength option favored in many BPH treatment protocols. Manufacturing mirrors our low-strength process but adjusts deposition volumes to maintain assay accuracy despite the increased tamsulosin load. Pellets remain tightly size-controlled and low in friability, enabling high-speed capsule filling without segregation. In-process monitoring verifies potency, moisture, and dissolution for both actives, ensuring a consistent therapeutic profile.`,
    `Customers gain access to detailed technical packages featuring comparative dissolution, interaction studies, and stability data under accelerated and long-term conditions. Packaging choices include barrier drums, nitrogen-purged bags, and smaller development packs for line extensions. Technical support covers method transfer, blend uniformity strategies, and bioequivalence study preparation, while regulatory experts maintain CTD-compliant documentation. Rraynex keeps higher-strength BPH combination therapy supply aligned with market expectations.`
  ],
  "product-venlafaxine": [
    `Venlafaxine HCl pellets deliver extended-release SNRI therapy for depression and anxiety management. Rraynex layers venlafaxine onto inert cores under controlled humidity, followed by polymer coatings tuned to release the active gradually over 24 hours. Pellets maintain a narrow particle size distribution and low friability, ensuring blend uniformity in capsules and multiparticulate tablets. Quality checks cover potency, residual solvents, and dissolution to guarantee the extended-release curve remains stable across batches.`,
  `Our documentation package includes dissolution comparisons against reference products, impurity profiles, and stability studies spanning ICH climatic zones. Packaging offerings - from moisture-resistant drums to small nitrogen-flushed bags - support both commercial supply and clinical development. Technical teams assist with method transfer, capsule lubricant optimization, and compatibility studies involving cellulose or methacrylate polymers. Responsive change-control practices keep regulatory dossiers current, giving partners confidence in venlafaxine supply continuity.`
  ],
  "product-omeprazole-mups": [
    `Omeprazole MUPS / Dexlansoprazole MUPS pellets provide flexible options for suspension, orally disintegrating tablets, and sprinkle formats. Rraynex produces multi-unit pellets with consistent size and density, enabling even dispersion in reconstituted or chewable dosage forms. Protective coatings guard the acid-labile active through storage and allow targeted release in the small intestine. Extensive in-process testing tracks assay, moisture, and dissolution to confirm reconstitution performance and gastro-resistance.`,
    `Technical dossiers supply dissolution data in water, milk, and buffer media, impurity profiles, and stability outcomes under multiple climates. Packaging programs include moisture-proof drums, foil-lined sachet kits, and small packs for pediatric formulation trials. Our development experts guide partners on suspension flavoring, sweetener compatibility, and device selection, while regulatory teams maintain CTD-ready modules. With dependable quality oversight, Rraynex helps brands deliver patient-friendly MUPS presentations.`
  ],
  "product-esomeprazole-mups": [
    `Esomeprazole MUPS pellets are tailored for pediatric and geriatric populations requiring dispersed or orally disintegrating presentations. Manufacturing controls particle size tightly to ensure smooth dispersion without clogging administration devices. Seal coats, drug layering, and enteric polymers are sequenced to safeguard the active until it reaches intestinal pH. Real-time analytics monitor assay, moisture, and dissolution, confirming consistent behavior across strengths.`,
    `Customers receive comprehensive technical data, including reconstitution studies, impurity trends, and stability results in humid, temperate, and tropical climates. Packaging can be configured into bulk drums, unit-dose sachet kits, or nitrogen-flushed bags for hospital pharmacies. Our formulation support covers flavor selection, sweetener compatibility, and suspending agent optimization, while regulatory teams maintain CTD-ready submissions. Rraynex keeps esomeprazole MUPS supply aligned with the needs of patient-centric dosage forms.`
  ],
  "product-rabeprazole-mups": [
    `Rabeprazole MUPS pellets enable fast dispersal and patient-friendly dosing, particularly for pediatric or geriatric care. Rraynex designs the pellets with uniform size and low friability so they suspend evenly in water or soft foods without grittiness. Enteric coatings protect the acid-labile rabeprazole until intestinal transit, while seal coats prevent moisture uptake during storage. In-process controls track assay, moisture, and dissolution to ensure reproducible performance.`,
    `Our technical package includes dispersion studies, dissolution in various media, and stability data reflecting climates up to zone IVB. Packaging solutions range from bulk drums to pre-measured sachet kits that simplify hospital dispensing. Technical support teams help customers tailor flavor systems, sweeteners, and suspension vehicles, while regulatory experts keep CTD documentation current. With resilient quality systems, Rraynex ensures rabeprazole MUPS deliveries remain consistent across markets.`
  ],
  "product-paracetamol": [
    `Paracetamol DC granules from Rraynex support analgesic and antipyretic lines with direct-compression performance. We granulate using controlled binder addition and fluid-bed drying, producing free-flowing particles that maintain uniform weight distribution on high-speed presses. Tight control over moisture and particle size reduces sticking, capping, and dusting, keeping production suites efficient. Each batch undergoes density, flow, and hardness testing, ensuring tablets or sachets achieve consistent quality.`,
    `Comprehensive documentation provides dissolution data, impurity profiles, and stability studies covering multiple climatic zones. Packaging options include moisture-protected drums, lined bags, and smaller development lots. Technical specialists advise on lubricant selection, flavor integration for pediatric syrups, and colorant compatibility. With transparent change-control and responsive quality support, Rraynex helps brands meet paracetamol demand during seasonal spikes or emergency tenders.`
  ],
  "product-api-omeprazole": [
    `Omeprazole API from Rraynex is manufactured under WHO-GMP governance with process controls that protect the acid-sensitive benzimidazole structure. High-purity raw materials pass stringent incoming inspection before conversion through controlled synthesis, crystallization, and micronization stages. Inline monitoring tracks pH, particle size, and moisture to keep each batch aligned with IP, BP, USP, and EP specifications. Impurity profiles remain low, supporting downstream formulation into pellets, tablets, or suspensions.`,
    `We deliver complete technical documentation, including DMF/ASMF summaries, stability data across climatic zones, and validated analytical methods. Packaging is available in nitrogen-flushed fiber drums or smaller lined containers for development work, each qualified for extended transport. Technical teams support method transfer, impurity investigations, and lifecycle change-control. With responsive customer service and global regulatory experience, Rraynex keeps omeprazole API supply secure for partners scaling proton pump inhibitor portfolios.`
  ],
  "product-fdf-probiotic": [
    `The Probiotic Sachet Blend is formulated to deliver high colony-forming-unit counts that support digestive wellness and immune health portfolios. We select clinically studied strains, balance prebiotic carriers, and use low-moisture granulation to safeguard viability. Controlled-environment blending minimizes oxygen exposure, while rapid foil-sachet filling protects the microbiome profile during distribution. Routine in-process checks measure water activity, strain identity, and blend uniformity to keep each lot consistent.`,
    `Customers receive dossiers detailing strain composition, CFU retention studies, stability in warm and humid climates, and packaging validation results. We offer sachet artwork templates, regulatory statements, and optional inclusion of vitamins or botanicals to tailor market positioning. Technical support spans flavor development, sweetener optimization, and reconstitution testing for beverages or yogurts. With agile change-control and collaborative communication, Rraynex helps brands launch probiotic sachets quickly while maintaining quality assurance.`
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
  const shortDesc = `${product.name} - ${product.type} (${product.category}). ${product.description} Available in strengths: ${
      product.strengths?.length ? product.strengths.join(", ") : "various strengths"
    }. Grade: ${product.grade || "IP / BP / USP / EP"}.`;
  const title = `${product.name} | Rraynex - Pharma Pellets & APIs`;
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
  a: `Click 'Request Details' or 'Contact Sales' - or email communications@rraynex.com`,
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
  a: `Click 'Request Details' or 'Contact Sales' - or email communications@rraynex.com with product grade ${product.grade || "IP / BP / USP / EP"}.`,
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
        slink="https://www.rraynex.com/assets/Rraynex_Brochure.pdf"
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