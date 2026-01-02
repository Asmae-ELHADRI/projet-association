import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });
    const [editingId, setEditingId] = useState(null);

    const fetchEvents = async () => {
        const res = await api.get("/events");
        setEvents(res.data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/events/${editingId}`, form);
            } else {
                await api.post("/events", form);
            }
            setForm({ title: "", description: "", date: "", location: "" });
            setEditingId(null);
            fetchEvents();
        } catch (err) {
            console.error("Error saving event:", err);
        }
    };

    return (
        <div className="admin-events fade-in">
            <div className="dashboard-header">
                <h1>Gestion des <span>Événements</span></h1>
                <p>Planifiez et affichez les événements à venir.</p>
            </div>

            <div className="glass-effect form-card" style={{ marginBottom: '3rem', maxWidth: '100%' }}>
                <h3>{editingId ? "Modifier l'événement" : "Nouvel événement"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Titre</label>
                            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Lieu</label>
                            <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Date et Heure</label>
                        <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" />
                    </div>
                    <button type="submit" className="btn-primary">{editingId ? "Mettre à jour" : "Créer l'événement"}</button>
                    {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ title: "", description: "", date: "", location: "" }); }}>Annuler</button>}
                </form>
            </div>

            <div className="glass-effect table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Date</th>
                            <th>Lieu</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((e) => (
                            <tr key={e.id}>
                                <td>{e.title}</td>
                                <td>{new Date(e.date).toLocaleString()}</td>
                                <td>{e.location}</td>
                                <td className="actions-cell">
                                    <button className="btn-icon" onClick={() => { setEditingId(e.id); setForm({ title: e.title, description: e.description, date: e.date, location: e.location }); }}>✏️</button>
                                    <button className="btn-icon" onClick={async () => { if (window.confirm("Supprimer ?")) { await api.delete(`/events/${e.id}`); fetchEvents(); } }}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEvents;
