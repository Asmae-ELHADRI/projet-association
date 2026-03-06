import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Gallery.css";

const Gallery = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const res = await api.get("/paintings");
        setPaintings(res.data);
      } catch (err) {
        console.warn("/paintings endpoint not available or empty:", err);
        setPaintings([]);
      }
    };
    fetchPaintings();
  }, []);

  return (
    <div className="gallery-page">
      <section className="artists-hero gallery-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="hero-overlay"></div>
        <div className="container fade-in-up">
          <span className="subtitle-tag on-dark">Exposition</span>
          <h1 className="serif text-white">Galerie <span className="text-gradient">Digitale</span></h1>
          <p className="text-white-muted">Immergez-vous dans une sélection rigoureuse d’œuvres d’art, témoignant de la richesse créative de notre région.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header text-center">
          <h2 className="serif">Œuvres en <span className="text-gradient">Exposition</span></h2>
          <div className="header-line"></div>
        </div>

        <div className="gallery-grid-premium">
          {paintings.length > 0 ? (
            paintings.map((p) => (
              <div key={p.id} className="painting-card-premium fade-in-up">
                <div className="painting-img-wrapper">
                  {p.image_path ? (
                    <img src={p.image_path} alt={p.title} className="painting-img" />
                  ) : (
                    <div className="painting-placeholder-premium serif">{p.title}</div>
                  )}
                  <div className="painting-badge-status">Collection</div>
                </div>
                <div className="painting-meta-premium">
                  <span className="p-artist-name">{p.artist_name || 'Artiste de l\'Association'}</span>
                  <h3 className="serif">{p.title}</h3>
                  <div className="p-footer-premium">
                    <span className="p-price-tag">{p.price ? `${p.price} MAD` : 'Prix sur demande'}</span>
                    <Link to={`/shop/${p.id}`} className="p-view-link">Détails</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results-premium glass-effect">
              <p>Notre galerie est en cours de réaménagement. Revenez bientôt pour découvrir de nouvelles œuvres.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
