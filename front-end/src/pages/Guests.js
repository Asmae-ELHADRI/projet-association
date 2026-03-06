import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Artists.css"; // Reuse artist styles for consistency

const Guests = () => {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const res = await api.get("/artists?is_member=false");
                setGuests(res.data);
            } catch (err) {
                console.error("Error fetching guests:", err);
            }
        };
        fetchGuests();
    }, []);

    return (
        <div className="artists-page guests-page">
            <section className="artists-hero guests-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1976')" }}>
                <div className="hero-overlay"></div>
                <div className="container fade-in-up">
                    <span className="subtitle-tag on-dark">Collaborations</span>
                    <h1 className="serif text-white">Nos <span className="text-gradient">Invités</span></h1>
                    <p className="text-white-muted">Découvrez les artistes d'exception qui collaborent avec notre association lors d'événements spéciaux.</p>
                </div>
            </section>

            <section className="container section-padding">
                <div className="section-header text-center">
                    <h2 className="serif">Artistes <span className="text-gradient">Partenaires</span></h2>
                    <div className="header-line"></div>
                </div>

                <div className="artist-grid">
                    {guests.length > 0 ? guests.map((g) => (
                        <div key={g.id} className="artist-item-premium fade-in-up">
                            <div className="artist-img-container">
                                {g.image_path ? (
                                    <img src={g.image_path} alt={g.name} className="artist-img" />
                                ) : (
                                    <div className="artist-placeholder-premium serif">{g.name.charAt(0)}</div>
                                )}
                                <div className="artist-overlay-info">
                                    <span className="artist-tag-premium">{g.specialty}</span>
                                </div>
                            </div>
                            <div className="artist-details-premium">
                                <h3 className="serif">{g.name}</h3>
                                <p>{g.bio?.substring(0, 120)}...</p>
                                <Link to={`/guests/${g.id}`} className="artist-link-premium">
                                    Découvrir le profil <span>→</span>
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <div className="no-results-premium glass-effect">
                            <p>Aucun artiste invité répertorié pour le moment.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Guests;
