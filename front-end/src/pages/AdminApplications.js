import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const res = await api.get("/artist-applications");
            setApplications(res.data);
        } catch (err) {
            console.error("Error fetching applications:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await api.put(`/artist-applications/${id}`, { status });
            fetchApplications();
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Une erreur est survenue.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette candidature ?")) {
            try {
                await api.delete(`/artist-applications/${id}`);
                fetchApplications();
            } catch (err) {
                console.error("Error deleting application:", err);
            }
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="admin-applications fade-in">
            <div className="dashboard-header">
                <h1>Candidatures <span>Artistes</span></h1>
                <p>Gérez les demandes d'adhésion à l'association.</p>
            </div>

            <div className="glass-effect table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Spécialité</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? applications.map((app) => (
                            <tr key={app.id}>
                                <td>{app.name}</td>
                                <td>{app.email}</td>
                                <td>{app.specialty}</td>
                                <td>
                                    <span className={`status-badge ${app.status}`}>
                                        {app.status === 'pending' ? 'En attente' : app.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    {app.status === 'pending' && (
                                        <>
                                            <button className="btn-success" onClick={() => handleStatusChange(app.id, 'accepted')}>Accepter</button>
                                            <button className="btn-danger" onClick={() => handleStatusChange(app.id, 'rejected')}>Refuser</button>
                                        </>
                                    )}
                                    <button className="btn-icon" onClick={() => handleDelete(app.id)}>🗑️</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center">Aucune candidature trouvée.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminApplications;
