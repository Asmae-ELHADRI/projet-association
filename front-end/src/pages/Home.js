import React, { useEffect, useState } from "react";
import { getHomeData } from "../api/api";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getHomeData().then((res) => {
      setAnnouncements(res.data.announcements);
      setEvents(res.data.events);
    });
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>L’Orientale Espace</h1>
        <p>Culture, Art & Communauté</p>
      </section>

      <section className="announcements">
        <h2>Dernières annonces</h2>
        {announcements.map((a) => (
          <div key={a.id} className="announcement-card">
            <h4>{a.title}</h4>
            <p>{a.content}</p>
          </div>
        ))}
      </section>

      <section className="events">
        <h2>Événements à venir</h2>
        {events.map((e) => (
          <div key={e.id} className="event-card">
            <h4>{e.name}</h4>
            <p>{e.date}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
