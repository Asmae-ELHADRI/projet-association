import React, { useState } from "react";
import api from "../services/api";
import "../styles/Forms.css";

const ArtistApply = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialty: "Peintre",
    message: "",
    portfolio_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/artist-applications", form);
      setSuccess(true);
      setForm({ name: "", email: "", specialty: "Peintre", message: "", portfolio_url: "" });
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Une erreur est survenue lors de l'envoi de votre demande.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="form-page">
        <div className="container section-padding">
          <div className="glass-effect form-card text-center fade-in">
            <div className="success-icon">✓</div>
            <h2>Demande envoyée !</h2>
            <p>Merci pour votre intérêt. L'administration va traiter votre demande et vous contactera prochainement.</p>
            <button className="btn-primary" onClick={() => setSuccess(false)}>Envoyer une autre demande</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <section className="form-hero">
        <div className="container fade-in">
          <h1>Rejoindre <span>l'Association</span></h1>
          <p>Partagez votre art, échangez vos idées, et grandissez avec nous.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="glass-effect form-card fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Spécialité</label>
              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              >
                <option value="Peintre">Peintre</option>
                <option value="Écrivain">Écrivain</option>
                <option value="Sculpteur">Sculpteur</option>
                <option value="Photographe">Photographe</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message / Motivation</label>
              <textarea
                placeholder="Dites-nous pourquoi vous souhaitez nous rejoindre..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label>Lien Portfolio / Réseaux Sociaux</label>
              <input
                type="url"
                placeholder="https://..."
                value={form.portfolio_url}
                onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Envoi en cours..." : "Soumettre ma candidature"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ArtistApply;
