import React, { useState } from "react";
import { applyForArtist } from "../api/api";

const ArtistApply = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    portfolio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    applyForArtist(form).then(() => {
      alert("Votre demande a été envoyée !");
      setForm({ name: "", email: "", bio: "", portfolio: "" });
    });
  };

  return (
    <div className="apply-container">
      <h1>Demande d’adhésion</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom complet"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <textarea
          placeholder="Biographie"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          required
        />

        <input
          type="url"
          placeholder="Lien portfolio (facultatif)"
          value={form.portfolio}
          onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
        />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ArtistApply;
