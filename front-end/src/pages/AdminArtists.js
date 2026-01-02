import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

const AdminArtists = () => {
    const [artists, setArtists] = useState([]);
    const [form, setForm] = useState({ name: "", specialty: "Peintre", bio: "", portfolio_url: "", is_member: true });
    const [editingId, setEditingId] = useState(null);

    const fetchArtists = async () => {
        const res = await api.get("/artists");
        setArtists(res.data);
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/artists/${editingId}`, form);
            } else {
                await api.post("/artists", form);
            }
            setForm({ name: "", specialty: "Peintre", bio: "", portfolio_url: "", is_member: true });
            setEditingId(null);
            fetchArtists();
        } catch (err) {
            console.error("Error saving artist:", err);
        }
    };

    return (
        <div className="admin-artists fade-in">
            <div className="dashboard-header">
                <h1>Gestion des <span>Artistes</span></h1>
                <p>Gérez le catalogue des artistes de l'association.</p>
            </div>

            <div className="glass-effect form-card" style={{ marginBottom: '3rem', maxWidth: '100%' }}>
                <h3>{editingId ? "Modifier l'artiste" : "Nouvel artiste"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nom complet</label>
                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Spécialité</label>
                            <select value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })}>
                                <option value="Peintre">Peintre</option>
                                <option value="Écrivain">Écrivain</option>
                                <option value="Sculpteur">Sculpteur</option>
                                <option value="Photographe">Photographe</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Portfolio URL</label>
                        <input type="url" value={form.portfolio_url} onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Biographie</label>
                        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows="4" />
                    </div>
                    <button type="submit" className="btn-primary">{editingId ? "Mettre à jour" : "Ajouter l'artiste"}</button>
                    {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ name: "", specialty: "Peintre", bio: "", portfolio_url: "", is_member: true }); }}>Annuler</button>}
                </form>
            </div>

            <div className="glass-effect table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Spécialité</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map((a) => (
                            <tr key={a.id}>
                                <td>{a.name}</td>
                                <td>{a.specialty}</td>
                                <td className="actions-cell">
                                    <button className="btn-icon" onClick={() => { setEditingId(a.id); setForm({ name: a.name, specialty: a.specialty, bio: a.bio, portfolio_url: a.portfolio_url || "", is_member: true }); }}>✏️</button>
                                    <button className="btn-icon" onClick={async () => { if (window.confirm("Supprimer ?")) { await api.delete(`/artists/${a.id}`); fetchArtists(); } }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminArtists;
