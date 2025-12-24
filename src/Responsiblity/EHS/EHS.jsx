import React, { useEffect, useRef } from "react";
import {
  HeartPulse,
  ShieldAlert,
  ShieldCheck,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
import Hero from "../../Components/Hero/Hero";
import SEO from "../../seo/SEO";
import { getPageSEO } from "../../seo/seoConfig";
import "./ehs.css";
import header from "./header.jpg";
import one from "./one.jpg";
const EHS_PILLARS = [
  {
    id: "safety",
    kicker: "Safe Operations",
    title: "Employee Health & Safety",
    description:
      "We design every workspace and process with safety in mind, ensuring our teams return home in the same shape they arrived.",
    image: one,
    highlights: [
      "Daily toolbox talks and hazard briefings",
      "Mandatory PPE audits across all shifts",
      "Certified first-aiders in every production block"
    ],
    icon: HeartPulse
  },
  {
    id: "posh",
    kicker: "Dignity At Work",
    title: "POSH & Anti Sexual Harassment",
    description:
      "Zero tolerance for harassment backed by transparent reporting, swift investigations, and restorative support for every employee.",
    image:
      "https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1024&fit=crop",
    highlights: [
      "Quarterly POSH awareness and refresher sessions",
      "Internal and external committee with gender balance",
      "Confidential reporting with 48-hour first response"
    ],
    icon: ShieldAlert
  }
];

const EHS_METRICS = [
  { value: "0", label: "Lost-time injuries recorded in FY24" },
  { value: "98%", label: "Safety training completion across teams" },
  { value: "12", label: "Emergency drills conducted this year" },
  { value: "48 hrs", label: "Average closure time for POSH cases" }
];

const SUPPORT_RESOURCES = [
  { title: "24/7 Safety Hotline", detail: "+91 0000 000 000", icon: Phone },
  { title: "Confidential POSH Desk", detail: "posh@rraynex.com", icon: Mail },
  { title: "Anonymous Reporting", detail: "Share a concern", icon: MessageCircle }
];

export default function EHS() {
  const seo = getPageSEO('ehs');
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const targets = document.querySelectorAll(".reveal-on-scroll");
    targets.forEach((node) => observerRef.current?.observe(node));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main className="ehs-page">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        pageName="ehs"
      />
      <Hero
        title="Environment, Health & Safety"
        subtitle="Protecting every colleague and championing a respectful POSH-compliant workplace—these are the foundations of our EHS promise."
        bgImage={header}
        ptitle="Safety Charter"
        plink="#safety-charter"
        stitle="Download Brochure"
        slink="https://www.rraynex.com/assets/Rraynex_Brochure.pdf"
        overlayGradient="linear-gradient(to bottom right, rgba(0, 0, 0, 0.72), rgba(42, 42, 42, 0.43))"

      />

      <section className="ehs-section ehs-section--intro">
        <div className="ehs-section__inner reveal-on-scroll">
          <h2>How we care</h2>
          <p>
            The wellbeing of our teams is safeguarded through continuous risk assessments, skill-building, and accessible
            support mechanisms. Every supervisor is trained to identify hazards, escalate concerns, and respond with
            empathy so safety never waits for a meeting.
          </p>
        </div>
      </section>

      <section className="ehs-section">
        <div className="ehs-section__header reveal-on-scroll">
          <h2>Two pillars of trust</h2>
          <p>
            Focused ownership keeps our EHS efforts sharp. These pillars define how we prevent incidents, respond when
            alerted, and reassure every colleague that support is a call away.
          </p>
        </div>
        <div className="ehs-pillars">
          {EHS_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article className="ehs-pillar reveal-on-scroll" key={pillar.id}>
                <div className="ehs-pillar__image">
                  <img src={pillar.image} alt={pillar.title} />
                </div>
                <div className="ehs-pillar__body">
                  <span className="ehs-pillar__badge">{pillar.kicker}</span>
                  <div className="ehs-pillar__title-group">
                    <Icon className="ehs-pillar__icon" />
                    <h3>{pillar.title}</h3>
                  </div>
                  <p>{pillar.description}</p>
                  <ul className="ehs-pillar__list">
                    {pillar.highlights.map((item) => (
                      <li key={item}>
                        <ShieldCheck className="ehs-pillar__check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ehs-section">
        <div className="ehs-section__header reveal-on-scroll">
          <h2>Proof in our numbers</h2>
          <p>Transparent metrics keep our leadership accountable and highlight where we direct future investments.</p>
        </div>
        <div className="ehs-metrics">
          {EHS_METRICS.map((metric) => (
            <div className="ehs-metric reveal-on-scroll" key={metric.label}>
              <span className="ehs-metric__value">{metric.value}</span>
              <span className="ehs-metric__label">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="ehs-section ehs-section--support">
        <div className="ehs-section__header reveal-on-scroll">
          <h2>Support when it matters</h2>
          <p>
            Employees can reach trained responders any time. Every channel is monitored, logged, and closed with
            documented action plans.
          </p>
        </div>
        <div className="ehs-support">
          {SUPPORT_RESOURCES.map((resource) => {
            const Icon = resource.icon;
            return (
              <div className="ehs-support__item reveal-on-scroll" key={resource.title}>
                <Icon className="ehs-support__icon" />
                <div>
                  <h3>{resource.title}</h3>
                  <p>{resource.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section> */}

      <section className="ehs-section ehs-section--closing">
        <div className="ehs-section__inner reveal-on-scroll">
          <h2>Always improving</h2>
          <p>
            Audits, incident reviews, and employee feedback loops help us refine policies every quarter. Share your ideas
            with the EHS council and partner in building a safer, more respectful Rraynex.
          </p>
        </div>
      </section>
    </main>
  );
}