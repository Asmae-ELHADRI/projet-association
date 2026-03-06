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
    portfolio_file: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.portfolio_file && !form.portfolio_url) {
      alert("Veuillez fournir un portfolio (fichier ou lien).");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('specialty', form.specialty);
      fd.append('message', form.message);

      if (form.portfolio_file) {
        fd.append('portfolio_file', form.portfolio_file);
      } else if (form.portfolio_url) {
        fd.append('portfolio_file', form.portfolio_url);
      }

      const res = await api.post('/artist-applications', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(true);
      setApplicationId(res.data.id || null);
      setForm({ name: "", email: "", specialty: "Peintre", message: "", portfolio_url: "", portfolio_file: null });
    } catch (err) {
      console.error("Error submitting application:", err);
      const errorMsg = err.response?.data?.message || "Une erreur est survenue lors de l'envoi de votre demande.";
      alert(errorMsg);
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
            <h2 className="success-title">Candidature Soumise !</h2>
            <p className="success-text">Merci pour votre intérêt envers L'Orientale Espace. Votre demande a été enregistrée avec succès.</p>
            <div className="reference-box">
              <p>Référence : <strong>#{applicationId}</strong></p>
            </div>
            <p className="next-steps">Notre équipe examinera votre profil et vous recevrez une réponse par email dans les plus brefs délais.</p>
            <button className="btn-primary" onClick={() => { setSuccess(false); setApplicationId(null); }}>
              Retour au formulaire
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artist-apply-page fade-in-up">
      <section className="artists-hero adhesion-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=2080')" }}>
        <div className="hero-overlay"></div>
        <div className="container">
          <span className="subtitle-tag on-dark">Rejoignez-Nous</span>
          <h1 className="serif text-white">Devenir <span className="text-gradient">Artiste Membre</span></h1>
          <p className="text-white-muted">Ouvrez les portes de notre galerie et partagez votre vision avec une communauté passionnée.</p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="adhesion-container-premium">
          <div className="adhesion-info-side">
            <h2 className="serif">Pourquoi nous <span className="text-gradient">rejoindre ?</span></h2>
            <div className="header-line"></div>
            <ul className="premium-perks-list">
              <li><span>✦</span> Exposition permanente dans notre galerie physique et digitale</li>
              <li><span>✦</span> Participation exclusive à nos événements et vernissages</li>
              <li><span>✦</span> Accès à nos ateliers et ressources de création</li>
              <li><span>✦</span> Visibilité accrue auprès des collectionneurs de la région</li>
            </ul>
          </div>

          <div className="adhesion-form-wrapper">
            <div className="form-card-premium glass-effect">
              {success ? (
                <div className="form-success-state text-center">
                  <div className="premium-success-icon">✓</div>
                  <h2 className="serif">Candidature Reçue</h2>
                  <p>Votre dossier est en cours d'examen par notre comité artistique. Référence : <strong>#{applicationId}</strong></p>
                  <button className="btn-secondary" onClick={() => { setSuccess(false); setApplicationId(null); }}>Nouveau Dossier</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="premium-form">
                  <div className="premium-form-row">
                    <div className="premium-form-group">
                      <label>Nom complet</label>
                      <input
                        type="text"
                        placeholder="Votre nom d'artiste"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="premium-form-group">
                      <label>Email de contact</label>
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="premium-form-group">
                    <label>Discipline Artistique</label>
                    <select
                      value={form.specialty}
                      onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                    >
                      <option value="Peintre">Peinture</option>
                      <option value="Écrivain">Littérature / Écriture</option>
                      <option value="Sculpteur">Sculpture</option>
                      <option value="Photographe">Photographie</option>
                      <option value="Arts Numériques">Arts Numériques</option>
                      <option value="Installation">Installation / Performance</option>
                      <option value="Autre">Autre discipline</option>
                    </select>
                  </div>

                  <div className="premium-form-group">
                    <label>Note d'intention / Démarche</label>
                    <textarea
                      placeholder="Décrivez votre univers artistique et vos motivations..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows="5"
                      required
                    />
                  </div>

                  <div className="portfolio-premium-section">
                    <h4 className="serif">Votre Portfolio</h4>
                    <p className="small-info">Présentez-nous vos meilleures réalisations (Lien ou Fichier).</p>

                    <div className="premium-form-group mt-4">
                      <label>Lien (Behance, Instagram, Portfolio...)</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={form.portfolio_url}
                        onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })}
                      />
                    </div>

                    <div className="form-divider-premium"><span>OU</span></div>

                    <div className="premium-form-group">
                      <label className="file-upload-label">
                        <input
                          type="file"
                          accept=".pdf,image/*,application/zip"
                          onChange={(e) => setForm({ ...form, portfolio_file: e.target.files[0] })}
                        />
                        <span className="file-custom-btn">Choisir un fichier</span>
                        {form.portfolio_file && <span className="file-name-display">{form.portfolio_file.name}</span>}
                      </label>
                      <small className="help-text">Max 10MB (PDF, JPG, PNG, ZIP)</small>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary btn-xl w-full" disabled={loading}>
                    {loading ? "Soumission..." : "Envoyer ma Candidature"}
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

export default ArtistApply;
