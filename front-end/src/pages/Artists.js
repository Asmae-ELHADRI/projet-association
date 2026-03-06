import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Artists.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await api.get("/artists?is_member=true");
        setArtists(res.data);
      } catch (err) {
        console.error("Error fetching artists:", err);
      }
    };
    fetchArtists();
  }, []);

  const categories = ["All", "Peintre", "Écrivain", "Sculpteur", "Photographe"];

  const filteredArtists = filter === "All"
    ? artists
    : artists.filter(a => a.specialty === filter);

  return (
    <div className="artists-page">
      <section className="artists-hero">
        <div className="hero-overlay"></div>
        <div className="container fade-in-up">
          <span className="subtitle-tag on-dark">Communauté</span>
          <h1 className="serif text-white">Nos <span className="text-gradient">Artistes</span></h1>
          <p className="text-white-muted">Découvrez les talents créatifs qui font vibrer l'essence de L'Orientale Espace.</p>
          <div className="hero-actions">
            <Link to="/artist-apply" className="btn-primary">Rejoindre l'aventure</Link>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header text-center">
          <h2 className="serif">Explorer par <span className="text-gradient">Discipline</span></h2>
          <div className="header-line"></div>
        </div>

        <div className="filter-bar fade-in-up">
          {categories.map(c => (
            <button
              key={c}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="artist-grid">
          {filteredArtists.length > 0 ? filteredArtists.map((a) => (
            <div key={a.id} className="artist-item-premium fade-in-up">
              <div className="artist-img-container">
                {a.image_path ? (
                  <img src={a.image_path} alt={a.name} className="artist-img" />
                ) : (
                  <div className="artist-placeholder-premium serif">{a.name.charAt(0)}</div>
                )}
                <div className="artist-overlay-info">
                  <span className="artist-tag-premium">{a.specialty}</span>
                </div>
              </div>
              <div className="artist-details-premium">
                <h3 className="serif">{a.name}</h3>
                <p>{a.bio?.substring(0, 120)}...</p>
                <Link to={`/artists/${a.id}`} className="artist-link-premium">
                  Découvrir le profil <span>→</span>
                </Link>
              </div>
            </div>
          )) : (
            <div className="no-results-premium glass-effect">
              <p>Aucun artiste ne correspond à cette discipline pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Artists;
