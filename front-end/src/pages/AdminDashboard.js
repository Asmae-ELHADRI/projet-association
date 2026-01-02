import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AdminOverview from "./AdminOverview";
import AdminApplications from "./AdminApplications";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminEvents from "./AdminEvents";
import AdminArtists from "./AdminArtists";
import AdminLogin from "./AdminLogin";
import { FaChartLine, FaBullhorn, FaCalendarAlt, FaUsers, FaUserTie, FaSignOutAlt } from "react-icons/fa";
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
  ];

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/images/logo1.png" alt="Logo" className="sidebar-logo" />
          <p>Admin Panel</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="artists" element={<AdminArtists />} />
          <Route path="applications" element={<AdminApplications />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
