import React, { useEffect, useState } from "react";
import { getMembers } from "../api/api";

const About = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers().then((res) => setMembers(res.data));
  }, []);

  return (
    <div className="about-container">
      <h1>À propos de l’association</h1>
      <p>
        L’Orientale Espace est un lieu dédié à la culture, la créativité et la
        transmission artistique...
      </p>

      <h2>Nos membres</h2>
      {members.map((m) => (
        <div key={m.id} className="member-card">
          <h4>{m.name}</h4>
          <p>{m.role}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
