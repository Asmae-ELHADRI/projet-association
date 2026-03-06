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
    <div className="contact-page fade-in-up">
      <section className="artists-hero contact-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&q=80&w=2020')" }}>
        <div className="hero-overlay"></div>
        <div className="container">
          <span className="subtitle-tag on-dark">Parlons d'Art</span>
          <h1 className="serif text-white">Contactez-<span className="text-gradient">Nous</span></h1>
          <p className="text-white-muted">Une question ? Une proposition de collaboration ? Notre équipe est à votre entière disposition.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="contact-main-grid">
          <div className="contact-visual-info">
            <h2 className="serif">Nos <span className="text-gradient">Coordonnées</span></h2>
            <div className="header-line"></div>
            <p className="contact-intro">N'hésitez pas à nous rendre visite ou à nous contacter par les moyens suivants.</p>

            <div className="contact-cards-stack">
              <div className="premium-contact-card glass-effect">
                <div className="contact-i-wrapper"><FaPhone /></div>
                <div>
                  <h4>Téléphone</h4>
                  <p>+212 5 36 61 XX XX</p>
                </div>
              </div>
              <div className="premium-contact-card glass-effect">
                <div className="contact-i-wrapper"><FaEnvelope /></div>
                <div>
                  <h4>Email</h4>
                  <p>contact@orientale-espace.ma</p>
                </div>
              </div>
              <div className="premium-contact-card glass-effect">
                <div className="contact-i-wrapper"><FaMapMarkerAlt /></div>
                <div>
                  <h4>Adresse</h4>
                  <p>Avenue Mohammed V, Berkane, Maroc</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-premium-wrapper">
            <div className="form-card-premium glass-effect">
              {success ? (
                <div className="form-success-state text-center">
                  <div className="premium-success-icon">✓</div>
                  <h2 className="serif">Message Transmis</h2>
                  <p>Votre demande a bien été reçue. Nous reviendrons vers vous avec une réponse artistique dans les plus brefs délais.</p>
                  <button className="btn-secondary" onClick={() => setSuccess(false)}>Nouvel envoi</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="premium-form">
                  <div className="premium-form-row">
                    <div className="premium-form-group">
                      <label>Votre Nom</label>
                      <input
                        type="text"
                        placeholder="Jean Dupont"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="premium-form-group">
                      <label>Adresse Email</label>
                      <input
                        type="email"
                        placeholder="jean@exemple.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="premium-form-group">
                    <label>Objet du Message</label>
                    <input
                      type="text"
                      placeholder="Demande d'informations..."
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                  </div>

                  <div className="premium-form-group">
                    <label>Votre Message</label>
                    <textarea
                      placeholder="Expliquez-nous comment nous pouvons vous aider..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows="6"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-xl w-full" disabled={loading}>
                    {loading ? "Transmission..." : "Envoyer le Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
