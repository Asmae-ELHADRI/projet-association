import React, { useState } from "react";
import api from "../services/api";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Forms.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact-messages", form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <section className="form-hero">
        <div className="container fade-in">
          <h1>Contactez-<span>Nous</span></h1>
          <p>Une question ? Une proposition ? Nous sommes à votre écoute.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="contact-grid">
          <div className="contact-info-cards fade-in">
            <div className="glass-effect contact-card">
              <FaPhone className="contact-icon" />
              <h3>Téléphone</h3>
              <p>+212 5 36 61 XX XX</p>
            </div>
            <div className="glass-effect contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email</h3>
              <p>contact@orientale-espace.ma</p>
            </div>
            <div className="glass-effect contact-card">
              <FaMapMarkerAlt className="contact-icon" />
              <h3>Adresse</h3>
              <p>Avenue Mohammed V, Berkane, Maroc</p>
            </div>
          </div>

          <div className="glass-effect form-card fade-in">
            {success ? (
              <div className="text-center">
                <div className="success-icon">✓</div>
                <h2>Message envoyé !</h2>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
                <button className="btn-primary" onClick={() => setSuccess(false)}>Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                <div className="form-group">
                  <label>Sujet</label>
                  <input
                    type="text"
                    placeholder="Sujet de votre message"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    placeholder="Votre message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows="5"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={loading}>
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
