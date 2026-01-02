import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Artists.css"; // Reuse artist styles

const Guests = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const res = await api.get("/guests");
        setGuests(res.data);
      } catch (err) {
        console.error("Error fetching guests:", err);
      }
    };
    fetchGuests();
  }, []);

  return (
    <div className="artists-page">
      <section className="artists-hero" style={{ backgroundImage: "linear-gradient(to bottom, rgba(15, 23, 42, 0.6), var(--bg-dark)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070')" }}>
        <div className="container fade-in">
          <h1>Nos <span>Invités</span></h1>
          <p>Des artistes venus d'ailleurs pour partager leurs univers avec nous.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="artist-grid">
          {guests.length > 0 ? guests.map((g) => (
            <div key={g.id} className="glass-effect artist-card fade-in">
              <div className="artist-image">
                {g.image_path ? <img src={g.image_path} alt={g.name} /> : <div className="artist-placeholder" style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}>{g.name.charAt(0)}</div>}
              </div>
              <div className="artist-info">
                <span className="artist-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>{g.specialty || 'Artiste Invité'}</span>
                <h3>{g.name}</h3>
                <p>{g.bio}</p>
                {g.portfolio_url && <a href={g.portfolio_url} target="_blank" rel="noreferrer" className="text-link">En savoir plus →</a>}
              </div>
            </div>
          )) : (
            <div className="no-results text-center">
              <p>Aucun invité programmé pour le moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Guests;
