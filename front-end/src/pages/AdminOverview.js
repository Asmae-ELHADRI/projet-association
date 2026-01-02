import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

const AdminOverview = () => {
    const [stats, setStats] = useState({
        artists_count: 0,
        events_count: 0,
        members_count: 0,
        applications_pending_count: 0,
        announcements_count: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/statistics");
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: "Artistes", value: stats.artists_count, color: "#6366f1" },
        { label: "Événements", value: stats.events_count, color: "#a855f7" },
        { label: "Membres Équipe", value: stats.members_count, color: "#f59e0b" },
        { label: "Candidatures", value: stats.applications_pending_count, color: "#ef4444" },
        { label: "Annonces", value: stats.announcements_count, color: "#10b981" },
    ];

    return (
        <div className="admin-overview fade-in">
            <div className="dashboard-header">
                <h1>Tableau de <span>Bord</span></h1>
                <p>Statistiques globales de L'Orientale Espace.</p>
            </div>

            <div className="stats-grid">
                {statCards.map((stat, idx) => (
                    <div key={idx} className="glass-effect stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Placeholder for charts/recent activity */}
            <div className="dashboard-content-grid">
                <div className="glass-effect activity-panel">
                    <h3>Activités Récentes</h3>
                    <p className="text-muted">Aucune activité récente pour le moment.</p>
                </div>
                <div className="glass-effect news-panel">
                    <h3>Conseils Admin</h3>
                    <ul className="text-muted">
                        <li>N'oubliez pas de traiter les candidatures en attente.</li>
                        <li>Ajoutez des photos de haute qualité pour vos événements.</li>
                        <li>Mettez à jour les biographies des artistes régulièrement.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
