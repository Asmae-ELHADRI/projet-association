import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/About.css";

const About = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/members");
        setMembers(res.data);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };
    fetchMembers();
  }, []);

  const timeline = [
    { year: "2015", event: "Fondation de l'association par un groupe d'artistes locaux." },
    { year: "2018", event: "Ouverture de notre premier espace d'exposition permanent." },
    { year: "2021", event: "Lancement du programme de résidence pour artistes invités." },
    { year: "2024", event: "Expansion de nos ateliers pour inclure les arts numériques." }
  ];

  return (
    <div className="about-page fade-in-up">
      <section className="artists-hero about-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2071')" }}>
        <div className="hero-overlay"></div>
        <div className="container">
          <span className="subtitle-tag on-dark">Depuis 2015</span>
          <h1 className="serif text-white">Notre Histoire, <span className="text-gradient">Notre Passion</span></h1>
          <p className="text-white-muted">L’Orientale Espace est plus qu’une association, c’est un sanctuaire dédié à l'âme créative de Berkane.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="about-narrative-grid">
          <div className="narrative-text">
            <h2 className="serif">L'art comme <span className="text-gradient">Héritage</span></h2>
            <div className="header-line"></div>
            <p>
              Depuis sa création, L'Orientale Espace s'efforce de démocratiser l'accès à la culture et à l'art. Nous croyons que chaque individu possède un potentiel créatif qui ne demande qu'à être exploré, nourri et partagé.
            </p>
            <p>
              Notre mission est de fournir un espace où les artistes peuvent se rencontrer, collaborer et exposer leurs œuvres, tout en offrant au public des expériences culturelles enrichissantes qui transcendent le quotidien.
            </p>
          </div>
          <div className="vision-card-premium glass-effect">
            <h3 className="serif">Notre Vision</h3>
            <p>Faire de Berkane un pôle artistique majeur dans la région de l'Oriental, en soutenant les talents locaux et en favorisant les échanges internationaux pour une culture sans frontières.</p>
          </div>
        </div>
      </section>

      <section className="bg-light section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="serif">L'Odyssée <span className="text-gradient">Orientale</span></h2>
            <div className="header-line center"></div>
            <p>Les moments clés qui ont façonné notre identité au fil des années.</p>
          </div>
          <div className="premium-timeline">
            {timeline.map((item, index) => (
              <div key={index} className="premium-timeline-item fade-in-up">
                <div className="timeline-year-premium serif">{item.year}</div>
                <div className="timeline-content-premium glass-effect">
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header text-center">
          <h2 className="serif">Les Gardiens du <span className="text-gradient">Projet</span></h2>
          <div className="header-line center"></div>
          <p>Les visages passionnés qui oeuvrent chaque jour pour faire vivre l'association.</p>
        </div>
        <div className="premium-member-grid">
          {members.length > 0 ? members.map((m) => (
            <div key={m.id} className="premium-member-card fade-in-up">
              <div className="member-visual">
                {m.image_path ? <img src={m.image_path} alt={m.name} /> : <div className="member-initial-premium serif">{m.name.charAt(0)}</div>}
              </div>
              <div className="member-meta-premium">
                <h3 className="serif">{m.name}</h3>
                <span className="member-role-premium">{m.role}</span>
              </div>
            </div>
          )) : (
            <div className="no-results-premium glass-effect">
              <p>Notre équipe s'agrandit. Les profils des membres seront bientôt disponibles.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
