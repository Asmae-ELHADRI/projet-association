import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { FaGlobe, FaEnvelope, FaPalette } from "react-icons/fa";
import "../styles/ArtistDetail.css";

const ArtistDetail = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await api.get(`/artists/${id}`);
                setArtist(res.data);
            } catch (err) {
                console.error("Error fetching artist details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchArtist();
    }, [id]);

    if (loading) return <div className="loading">Chargement...</div>;
    if (!artist) return <div className="error">Artiste non trouvé.</div>;

    return (
        <div className="artist-detail-page fade-in-up">
            <section className="artist-profile-hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <Link to="/artists" className="premium-back-link on-dark">
                        <span>←</span> Retour à la communauté
                    </Link>

                    <div className="profile-hero-content">
                        <div className="profile-image-wrapper-premium glass-effect">
                            {artist.image_path ? (
                                <img src={artist.image_path} alt={artist.name} />
                            ) : (
                                <div className="placeholder-hero-premium serif">{artist.name.charAt(0)}</div>
                            )}
                        </div>

                        <div className="profile-headlines">
                            <span className="subtitle-tag on-dark">{artist.specialty}</span>
                            <h1 className="serif text-white">{artist.name}</h1>
                            <div className="profile-social-premium">
                                {artist.portfolio_url && (
                                    <a href={artist.portfolio_url} target="_blank" rel="noreferrer" className="social-pill">
                                        <FaGlobe /> Portfolio Officiel
                                    </a>
                                )}
                                <a href={`mailto:${artist.email || 'contact@orientale-espace.ma'}`} className="social-pill">
                                    <FaEnvelope /> Contacter l'Artiste
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
                            <h3 className="serif">L'Approche</h3>
                            <div className="header-line"></div>
                            <div className="bio-content-premium">
                                <p>{artist.bio || "Cet artiste n'a pas encore renseigné sa biographie complète, mais ses œuvres parlent d'elles-mêmes à travers sa technique et sa vision unique."}</p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-gallery-premium">
                        <div className="section-header-compact">
                            <h2 className="serif">Galerie <span className="text-gradient">Personnelle</span></h2>
                        </div>

                        <div className="works-grid-premium">
                            {artist.artworks && artist.artworks.length > 0 ? artist.artworks.map((work) => (
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
                                    <p>Aucune œuvre n'est actuellement exposée dans la galerie de cet artiste.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArtistDetail;
