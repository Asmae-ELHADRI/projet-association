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
        const res = await api.get("/artists");
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
        <div className="container fade-in">
          <h1>Nos <span>Artistes</span></h1>
          <p>Découvrez les talents créatifs qui font vibrer L'Orientale Espace.</p>
          <Link to="/artist-apply" className="btn-primary">Devenir Membre</Link>
        </div>
      </section>

      <section className="container section-padding">
        <div className="filter-bar fade-in">
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
            <div key={a.id} className="glass-effect artist-card fade-in">
              <div className="artist-image">
                {a.image_path ? <img src={a.image_path} alt={a.name} /> : <div className="artist-placeholder">{a.name.charAt(0)}</div>}
              </div>
              <div className="artist-info">
                <span className="artist-tag">{a.specialty}</span>
                <h3>{a.name}</h3>
                <p>{a.bio}</p>
                {a.portfolio_url && <a href={a.portfolio_url} target="_blank" rel="noreferrer" className="text-link">Voir le portfolio →</a>}
              </div>
            </div>
          )) : (
            <div className="no-results text-center">
              <p>Aucun artiste trouvé pour cette catégorie.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Artists;
