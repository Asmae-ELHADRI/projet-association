import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AdminOverview from "./AdminOverview";
import AdminApplications from "./AdminApplications";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminEvents from "./AdminEvents";
import AdminArtists from "./AdminArtists";
import AdminLogin from "./AdminLogin";
import AdminShop from "./AdminShop";
import AdminOrders from "./AdminOrders";
import { FaChartLine, FaBullhorn, FaCalendarAlt, FaUsers, FaUserTie, FaSignOutAlt } from "react-icons/fa";
import { cn } from "../lib/utils";
import api from "../services/api";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("admin_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      setUser(null);
      navigate("/admin/login");
    }
  };

  if (!user && location.pathname !== "/admin/login") {
    return <AdminLogin onLogin={setUser} />;
  }

  if (location.pathname === "/admin/login" && user) {
    navigate("/admin");
    return null;
  }

  const navItems = [
    { path: "/admin", label: "Vue d'ensemble", icon: <FaChartLine /> },
    { path: "/admin/announcements", label: "Annonces", icon: <FaBullhorn /> },
    { path: "/admin/events", label: "Événements", icon: <FaCalendarAlt /> },
    { path: "/admin/artists", label: "Artistes", icon: <FaUserTie /> },
    { path: "/admin/applications", label: "Candidatures", icon: <FaUsers /> },
    { path: "/admin/shop", label: "Boutique", icon: <FaBullhorn /> },
    { path: "/admin/orders", label: "Commandes", icon: <FaChartLine /> },
  ];

  return (
    <div className="admin-dashboard-premium fade-in">
      <header className="admin-navbar-horizontal">
        <div className="admin-nav-container">
          <div className="admin-brand">
            <Link to="/">
              <img src="/images/logo1.png" alt="Logo" className="admin-logo-img" />
            </Link>
            <div className="admin-brand-info">
              <span className="admin-title">Panel Administrateur</span>
              <span className="admin-user-welcome">Ravi de vous revoir, {user?.name || 'Admin'}</span>
            </div>
          </div>

          <nav className="admin-nav-horizontal">
            <ul className="admin-nav-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn("admin-nav-link", location.pathname === item.path ? "active" : "")}
                  >
                    <span className="admin-nav-icon">{item.icon}</span>
                    <span className="admin-nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="admin-actions-horizontal">
            <button onClick={handleLogout} className="admin-logout-premium" title="Déconnexion">
              <FaSignOutAlt />
              <span>Quitter</span>
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main-content-premium">
        <div className="admin-container-fluid">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="artists" element={<AdminArtists />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="shop" element={<AdminShop />} />
            <Route path="orders" element={<AdminOrders />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
