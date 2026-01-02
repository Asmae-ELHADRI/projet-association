import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Forms.css";

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/login", { email, password });
            localStorage.setItem("admin_token", res.data.token);
            localStorage.setItem("admin_user", JSON.stringify(res.data.user));
            onLogin(res.data.user);
            navigate("/admin");
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Email ou mot de passe incorrect.");
            } else {
                setError("Erreur de connexion au serveur. Vérifiez que le backend est lancé.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div className="glass-effect form-card fade-in" style={{ maxWidth: '450px' }}>
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <h2>Espace <span>Admin</span></h2>
                        <p>Connectez-vous pour gérer le site.</p>
                    </div>

                    {error && <div className="error-message" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full" disabled={loading}>
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
