import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { FaGlobe, FaEnvelope, FaPalette } from "react-icons/fa";
import "../styles/ArtistDetail.css";

const GuestDetail = () => {
    const { id } = useParams();
    const [guest, setGuest] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuest = async () => {
            try {
                // Guests are often stored in the same artists table but with a different role/flag
                // Or there is a separate endpoint /guests
                const res = await api.get(`/guests/${id}`);
                setGuest(res.data);
            } catch (err) {
                console.error("Error fetching guest details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchGuest();
    }, [id]);

    if (loading) return (
        <div className="loading-state">
            <div className="spinner"></div>
            <p>Chargement du profil invité...</p>
        </div>
    );

    if (!guest) return (
        <div className="container section-padding text-center">
            <h2 className="serif">Artiste Invité introuvable</h2>
            <Link to="/guests" className="btn-primary mt-4">Retour aux collaborations</Link>
        </div>
    );

    return (
        <div className="artist-detail-page guest-detail-page fade-in-up">
            <section className="artist-profile-hero guest-hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <Link to="/guests" className="premium-back-link on-dark">
                        <span>←</span> Retour aux collaborations
                    </Link>

                    <div className="profile-hero-content">
                        <div className="profile-image-wrapper-premium glass-effect">
                            {guest.image_path ? (
                                <img src={guest.image_path} alt={guest.name} />
                            ) : (
                                <div className="placeholder-hero-premium serif">{guest.name.charAt(0)}</div>
                            )}
                        </div>

                        <div className="profile-headlines">
                            <span className="subtitle-tag on-dark">Artiste Invité</span>
                            <h1 className="serif text-white">{guest.name}</h1>
                            <div className="profile-social-premium">
                                {guest.portfolio_url && (
                                    <a href={guest.portfolio_url} target="_blank" rel="noreferrer" className="social-pill">
                                        <FaGlobe /> Portfolio
                                    </a>
                                )}
                                <a href={`mailto:${guest.email || 'info@orientale-espace.ma'}`} className="social-pill">
                                    <FaEnvelope /> Contacter l'intervenant
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container section-padding">
                <div className="profile-main-grid">
                    <div className="profile-sidebar-premium">
                        <div className="sticky-info">
                            <h3 className="serif">Parcours Invité</h3>
                            <div className="header-line"></div>
                            <div className="bio-content-premium">
                                <p>{guest.bio || "Cet artiste invité collabore avec L'Orientale Espace pour enrichir notre vision culturelle à travers des ateliers, des conférences ou des expositions éphémères."}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-gallery-premium">
                        <div className="section-header-compact">
                            <h2 className="serif">Contribution <span className="text-gradient">Artistique</span></h2>
                        </div>

                        <div className="works-grid-premium">
                            {guest.artworks && guest.artworks.length > 0 ? guest.artworks.map((work) => (
                                <div key={work.id} className="work-card-premium fade-in-up">
                                    <div className="work-img-wrapper">
                                        {work.image_path ? (
                                            <img src={work.image_path} alt={work.title} />
                                        ) : (
                                            <div className="work-placeholder-premium">
                                                <FaPalette />
                                            </div>
                                        )}
                                    </div>
                                    <div className="work-meta-premium">
                                        <h4 className="serif">{work.title}</h4>
                                        <span className="work-price-premium">{work.price} MAD</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="no-works-premium glass-effect">
                                    <p>Les contributions détaillées de cet artiste seront bientôt répertoriées dans notre archive digitale.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GuestDetail;
