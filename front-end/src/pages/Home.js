import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";
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
      {/* Cinematic Hero Section */}
      <section className="cinematic-hero">
        <div className="hero-bg-overlay"></div>
        <div className="hero-container container">
          <div className="hero-content fade-in-up">
            <span className="subtitle-tag">L'Orientale Espace</span>
            <h1 className="hero-title serif">
              L'Art de Vivre <br />
              <span className="text-gradient">L'Émotion</span>
            </h1>
            <p className="hero-description">
              Plongez dans un univers où chaque œuvre raconte une histoire.
              Une fenêtre d'exception sur la création contemporaine et l'élégance artistique.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">
                Explorer la Collection <BsArrowRight />
              </Link>
              <Link to="/about" className="btn-secondary">
                Notre Histoire
              </Link>
            </div>
          </div>

          <div className="hero-visuals fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="floating-artwork">
              <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600" alt="Artwork" className="premium-image" />
              <div className="floating-stat-card glass-effect">
                <span className="stat-label">Artistes Membres</span>
                <span className="stat-number serif">24+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="container section-padding">
        <div className="section-header text-center">
          <span className="subtitle-tag">Actualités</span>
          <h2 className="serif">Dernières <span className="text-gradient">Annonces</span></h2>
          <div className="header-line"></div>
        </div>

        <div className="card-grid">
          {announcements.map((a) => (
            <div key={a.id} className="premium-card fade-in-up">
              <div className="card-top">
                <span className="card-category">Note</span>
                <span className="card-date">{new Date(a.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.content}</p>
              <div className="card-footer">
                <Link to="/about" className="text-link">Lire la suite →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-midnight section-padding">
        <div className="container">
          <div className="section-header text-center contrast">
            <span className="subtitle-tag on-dark">Agenda</span>
            <h2 className="serif text-white">Événements <span className="text-gradient">à Venir</span></h2>
            <div className="header-line amber"></div>
          </div>

          <div className="card-grid">
            {events.map((e) => (
              <div key={e.id} className="event-glass-card glass-effect fade-in-up">
                <div className="event-img-wrapper">
                  {e.image_path ? <img src={e.image_path} alt={e.title} /> : <div className="event-placeholder">Event</div>}
                  <div className="event-date-chip">
                    {e.date && new Date(e.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                  </div>
                </div>
                <div className="event-info">
                  <h3>{e.title}</h3>
                  <p className="event-loc"><FiCalendar /> {e.location}</p>
                  <Link to={`/events/${e.id}`} className="btn-text-amber">Voir les détails</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Community Section */}
      <section className="container section-padding">
        <div className="glass-effect cta-banner fade-in-up">
          <div className="cta-content">
            <h2 className="serif">Rejoignez notre <span className="text-gradient">Communauté</span></h2>
            <p>Vous êtes un artiste ? Exposez vos œuvres et partagez votre passion avec un public passionné.</p>
            <Link to="/artist-apply" className="btn-primary">Postuler maintenant</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
