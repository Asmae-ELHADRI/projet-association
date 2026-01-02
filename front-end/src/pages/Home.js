import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Home.css";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [annRes, eveRes] = await Promise.all([
          api.get("/announcements"),
          api.get("/events")
        ]);
        setAnnouncements(annRes.data.slice(0, 3));
        setEvents(eveRes.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section fade-in">
        <div className="hero-content">
          <span className="hero-badge">L'Association Culturelle</span>
          <h1>L'Orientale <span>Espace</span></h1>
          <p>Un carrefour d'art, de culture et d'échanges au cœur de Berkane. Découvrez nos talents et rejoignez notre communauté.</p>
          <div className="hero-ctas">
            <button className="btn-primary">Découvrir les Artistes</button>
            <button className="btn-secondary">Nos Événements</button>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      <section className="container section-padding">
        <div className="section-header">
          <h2>Dernières Annonces</h2>
          <p>Restez informé des actualités de l'association.</p>
        </div>
        <div className="card-grid">
          {announcements.map((a) => (
            <div key={a.id} className="glass-effect announcement-card fade-in">
              <div className="card-content">
                <h3>{a.title}</h3>
                <p>{a.content}</p>
                <span className="card-date">{new Date(a.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header">
          <h2>Événements à Venir</h2>
          <p>Ne manquez pas nos prochains rendez-vous culturels.</p>
        </div>
        <div className="card-grid">
          {events.map((e) => (
            <div key={e.id} className="glass-effect event-card fade-in">
              <div className="event-date-badge">
                {e.date && new Date(e.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
              </div>
              <div className="card-content">
                <h3>{e.title}</h3>
                <p>{e.location}</p>
                <button className="text-link">En savoir plus →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
