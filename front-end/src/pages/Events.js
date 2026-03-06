import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const today = new Date();
  const upcomingEvents = events.filter(e => new Date(e.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastEvents = events.filter(e => new Date(e.date) < today).sort((a, b) => new Date(b.date) - new Date(a.date));

  const EventCard = ({ e }) => (
    <div key={e.id} className="glass-effect event-card fade-in">
      <div className="event-meta">
        <span className="event-date">{new Date(e.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        <h3>{e.title}</h3>
        <p className="event-location">{e.location}</p>
      </div>
      <p className="event-desc">{e.description?.substring(0, 120)}...</p>
      <Link to={`/events/${e.id}`} className="text-link">En savoir plus →</Link>
    </div>
  );

  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="container fade-in">
          <h1>Nos <span>Événements</span></h1>
          <p>Retrouvez toutes les activités culturelles et ateliers de l'association.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="section-header">
          <h2>Prochains événements</h2>
          <p>Participez à nos futures rencontres artistiques.</p>
        </div>

        <div className="event-grid">
          {upcomingEvents.length > 0 ? upcomingEvents.map((e) => (
            <EventCard e={e} key={e.id} />
          )) : (
            <div className="no-results text-center">
              <p>Aucun événement programmé pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {pastEvents.length > 0 && (
        <section className="container section-padding bg-light">
          <div className="section-header">
            <h2>Événements Passés</h2>
            <p>Revivez nos moments forts.</p>
          </div>
          <div className="event-grid">
            {pastEvents.map((e) => (
              <EventCard e={e} key={e.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Events;
