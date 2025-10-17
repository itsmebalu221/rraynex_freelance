import React, { useEffect, useState } from "react";
import "./CSR.css";
import one from "../../Assets/CSR/1.jpeg"
import two from "../../Assets/CSR/2.jpeg"
import three from "../../Assets/CSR/3.jpeg"
import four from "../../Assets/CSR/4.jpeg" 
import five from "../../Assets/CSR/5.jpeg"
import six from "../../Assets/CSR/6.jpeg" 
import seven from "../../Assets/CSR/7.jpeg"
import eight from "../../Assets/CSR/8.jpeg"
import nine from "../../Assets/CSR/9.jpeg"
import ten from "../../Assets/CSR/10.jpeg"
import eleven from "../../Assets/CSR/11.jpeg"
import twelve from "../../Assets/CSR/12.jpeg"
import thirteen from "../../Assets/CSR/13.jpeg"
import Hero from "../../Components/Hero/Hero";

const CSR_PROGRAMS = [
  {
    id: "durgashtami-celebration",
    kicker: "Community Celebration",
    title: "Durgashtami with 500+ Students",
    summary:
      "We welcomed over five hundred underprivileged students to our campus for a day-long Durgashtami celebration that blended tradition, nourishment, and joyful play.",
    body:
      "Rraynex teams, volunteers, and partner schools curated an inclusive festive experience complete with cultural rituals, hearty meals, and activity zones. Parents, teachers, and community leaders joined the celebrations, creating an atmosphere of unity and shared gratitude.",
    points: [
      "A traditional pooja led the proceedings, followed by devotional music that set a reverent tone for the day.",
      "A hot lunch service ensured every child enjoyed wholesome food, with our cafeteria crew plating festival favourites and healthy desserts.",
      "Interactive stations—from art corners to friendly sports matches—kept everyone engaged and allowed our teams to connect personally with every student.",
    ],
    image:five,
    galleryTitle: "Celebration Highlights",
    galleryCopy:
      "Replace these placeholders with moments from your Durgashtami event—rituals, shared meals, and the smiling faces that made the day special.",
    gallery: [
      
      {
        id: "durgashtami-3",
        img:three,
      },
      {
        id: "durgashtami-4",
        img:four,
      },
      {
        id: "durgashtami-7",
        img:seven,
      },
      {
        id: "durgashtami-10",
        img:ten,
      },
      {
        id: "durgashtami-11",
        img:eleven,
      },
      {
        id: "durgashtami-12",
        img:twelve,
      },
      {
        id: "durgashtami-13",
        img:thirteen,
      },
    ],
  },
  // {
  //   id: "science-museum-visit",
  //   kicker: "Experiential Learning",
  //   title: "Scientific Museum Immersion",
  //   summary:
  //     "Our scientists and outreach team curated a hands-on day at a leading scientific museum, pairing discovery zones with mentorship conversations for aspiring learners.",
  //   body:
  //     "This upcoming case study will document how Rraynex experts guide students through interactive exhibits, lab demonstrations, and career storytelling. Use this space to narrate the learning journey once your next visit is complete.",
  //   points: [
  //     "Outline key exhibits explored and the takeaways you want visitors to remember.",
  //     "Describe how your scientists contextualise complex concepts for young minds.",
  //     "Capture quotes or reflections from participants to bring the experience alive.",
  //   ],
  //   image:
  //     "https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&w=1200&h=880&fit=crop",
  //   galleryTitle: "Museum Moments",
  //   galleryCopy:
  //     "When ready, showcase snapshots from the museum floor—interactive galleries, lab demos, and your teams guiding curious minds.",
  //   gallery: [
  //     {
  //       id: "museum-1",
  //       img:
  //         "https://images.pexels.com/photos/853123/pexels-photo-853123.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  //     },
  //     {
  //       id: "museum-2",
  //       img:
  //         "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  //     },
  //     {
  //       id: "museum-3",
  //       img:
  //         "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
  //     },
  //   ],
  // },
];

export default function CSR() {
  const [isHeroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    document.title = "Corporate Social Responsibility | Rraynex";
    setHeroVisible(true);
  }, []);

  return (
    <main className="csr-page">
      <Hero
              title="Corporate Social Responsibility"
              subtitle="At Rraynex, we see CSR as a responsibility to uplift the communities and ecosystems that surround our operations. Celebrations, learning journeys, and healthcare access are woven into everything we do."
              bgImage={eleven}
              plink="/products"
              ptitle="Explore Products"
              slink="https://www.rraynex.com/assets/Rraynex_Brochure.pdf"
              stitle="Download Brochure"
                      overlayGradient="linear-gradient(to bottom right, rgba(0, 0, 0, 0.72), rgba(42, 42, 42, 0.9))"

            />

      <div className="csr-container">
        <section className="csr-header">
          <span className="csr-kicker">People • Planet • Progress</span>
          <h1>CSR at Rraynex</h1>
          <p className="csr-lead">
            Corporate citizenship shapes the way we build products, plan facilities, and collaborate with the communities that power our growth. We invest in programmes that strengthen public health systems, expand education access, and preserve the environments around our sites.
          </p>
          <p className="csr-lead">
            Every initiative is measured on transparency, long-term viability, and the shared value it creates for residents, regulators, and our colleagues. The highlights below capture two flagship programmes you can continue to evolve with richer stories and imagery.
          </p>
        </section>

        {CSR_PROGRAMS.map((program, index) => (
          <section className="program-block" key={program.id}>
            <div className={`program-layout ${index % 2 !== 0 ? "reverse" : ""}`}>
              <figure className="program-media">
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/960x720.png?text=Add+Program+Image";
                  }}
                />
              </figure>

              <div className="program-copy">
                <span className="program-kicker">{program.kicker}</span>
                <h2 className="program-title">{program.title}</h2>
                <p className="program-summary">{program.summary}</p>
                <p className="program-body">{program.body}</p>
                <ul className="program-points">
                  {program.points.map((point, pointIndex) => (
                    <li key={`${program.id}-point-${pointIndex}`}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="program-gallery">
              <div className="program-gallery__header">
                <h3 className="gallery-title">{program.galleryTitle}</h3>
                <p className="gallery-copy">{program.galleryCopy}</p>
              </div>
              <div className="gallery-track" role="list">
                {program.gallery.map((frame) => (
                  <div className="gallery-card" key={frame.id} role="listitem">
                    <img
                      src={frame.img}
                      alt={`${program.title} gallery image`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/640x420.png?text=Add+CSR+Photo";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="csr-conclusion">
          <h2>Building Shared Value</h2>
          <p>
            Beyond statutory CSR compliance, Rraynex treats community investment as a strategic pillar of sustainable operations. Our teams co-create solutions with local stakeholders, publish impact dashboards, and continually refine programmes based on evidence gathered in the field. Partner with us to expand the reach of these initiatives and design new ones that advance equitable, future-ready healthcare.
          </p>
        </section>
      </div>
    </main>
  );
}