import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import "../styles/EventDetail.css";

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);
            } catch (err) {
                console.error("Error fetching event details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) return <div className="loading">Chargement...</div>;
    if (!event) return <div className="error">Événement non trouvé.</div>;

    return (
        <div className="event-detail-page fade-in-up">
            <section className="event-hero-premium">
                <div className="hero-overlay"></div>
                <div className="container">
                    <Link to="/events" className="premium-back-link on-dark">
                        <span>←</span> Retour aux événements
                    </Link>
                    <div className="event-hero-content">
                        <span className="subtitle-tag on-dark">Événement Culturel</span>
                        <h1 className="serif text-white event-main-title">{event.title}</h1>
                        <div className="event-meta-premium">
                            <span className="meta-item-premium">
                                <FaCalendarAlt />
                                {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                            <span className="meta-item-premium">
                                <FaMapMarkerAlt /> {event.location}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container section-padding">
                <div className="event-details-grid-premium">
                    <div className="event-main-story">
                        <div className="event-primary-image glass-effect fade-in-up">
                            {event.image_path && <img src={event.image_path} alt={event.title} />}
                        </div>

                        <div className="event-narrative">
                            <h2 className="serif">À propos de <span className="text-gradient">l'événement</span></h2>
                            <div className="header-line"></div>
                            <p>{event.description}</p>
                        </div>
                    </div>

                    <aside className="event-discover-sidebar">
                        <div className="sticky-sidebar">
                            <div className="participants-card-premium glass-effect">
                                <h3 className="serif"><FaUsers /> Artistes Présents</h3>
                                <div className="sidebar-line"></div>
                                {event.artists && event.artists.length > 0 ? (
                                    <div className="artist-avatars-stack">
                                        {event.artists.map((artist) => (
                                            <Link to={`/artists/${artist.id}`} key={artist.id} className="stacked-artist-item">
                                                <div className="mini-avatar-premium">
                                                    {artist.image_path ? <img src={artist.image_path} alt={artist.name} /> : <span>{artist.name.charAt(0)}</span>}
                                                </div>
                                                <div className="stacked-info">
                                                    <strong>{artist.name}</strong>
                                                    <span>{artist.specialty}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-participants">Aucun artiste répertorié pour cet événement.</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

export default EventDetail;
