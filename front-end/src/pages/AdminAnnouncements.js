import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

const AdminAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [form, setForm] = useState({ title: "", content: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchAnnouncements = async () => {
        const res = await api.get("/announcements");
        setAnnouncements(res.data);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/announcements/${editingId}`, form);
            } else {
                await api.post("/announcements", form);
            }
            setForm({ title: "", content: "" });
            setEditingId(null);
            fetchAnnouncements();
        } catch (err) {
            console.error("Error saving announcement:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cette annonce ?")) {
            await api.delete(`/announcements/${id}`);
            fetchAnnouncements();
        }
    };

    return (
        <div className="admin-announcements fade-in">
            <div className="dashboard-header">
                <h1>Gestion des <span>Annonces</span></h1>
                <p>Publiez et modifiez les actualités de l'association.</p>
            </div>

            <div className="glass-effect form-card" style={{ marginBottom: '3rem', maxWidth: '100%' }}>
                <h3>{editingId ? "Modifier l'annonce" : "Nouvelle annonce"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Titre</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contenu</label>
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            rows="4"
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="btn-primary">
                            {editingId ? "Mettre à jour" : "Publier"}
                        </button>
                        {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ title: "", content: "" }); }}>Annuler</button>}
                    </div>
                </form>
            </div>

            <div className="glass-effect table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Contenu</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map((a) => (
                            <tr key={a.id}>
                                <td>{a.title}</td>
                                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.content}</td>
                                <td>{new Date(a.created_at).toLocaleDateString()}</td>
                                <td className="actions-cell">
                                    <button className="btn-icon" onClick={() => { setEditingId(a.id); setForm({ title: a.title, content: a.content }); }}>✏️</button>
                                    <button className="btn-icon" onClick={() => handleDelete(a.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAnnouncements;
