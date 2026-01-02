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
    <div className="about-page">
      <section className="about-hero">
        <div className="container fade-in">
          <h1>Notre Histoire, <span>Notre Passion</span></h1>
          <p>L’Orientale Espace est plus qu’une association, c’est un foyer pour la créativité à Berkane.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="about-content-grid">
          <div className="about-text fade-in">
            <h2>Qui sommes-nous ?</h2>
            <p>
              Depuis sa création, L'Orientale Espace s'efforce de démocratiser l'accès à la culture et à l'art. Nous croyons que chaque individu possède un potentiel créatif qui ne demande qu'à être exploré.
            </p>
            <p>
              Notre mission est de fournir un espace où les artistes peuvent se rencontrer, collaborer et exposer leurs œuvres, tout en offrant au public des expériences culturelles enrichissantes.
            </p>
          </div>
          <div className="about-vision glass-effect fade-in">
            <h3>Notre Vision</h3>
            <p>Faire de Berkane un pôle artistique majeur dans la région de l'Oriental, en soutenant les talents locaux et en favorisant les échanges internationaux.</p>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header">
          <h2>Parcours de l'Association</h2>
          <p>Les moments clés qui ont façonné notre identité.</p>
        </div>
        <div className="timeline">
          {timeline.map((item, index) => (
            <div key={index} className="timeline-item fade-in">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-content glass-effect">
                <p>{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header">
          <h2>L'Équipe</h2>
          <p>Les visages derrière l'organisation.</p>
        </div>
        <div className="member-grid">
          {members.length > 0 ? members.map((m) => (
            <div key={m.id} className="glass-effect member-card fade-in">
              <div className="member-avatar">
                {m.image_path ? <img src={m.image_path} alt={m.name} /> : <div className="avatar-placeholder">{m.name.charAt(0)}</div>}
              </div>
              <h3>{m.name}</h3>
              <p className="member-role">{m.role}</p>
            </div>
          )) : (
            <p className="text-center">Aucun membre affiché pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
