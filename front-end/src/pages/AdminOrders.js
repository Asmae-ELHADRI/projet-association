import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (e) {
      // fallback to localStorage orders for demo
      try { const local = JSON.parse(localStorage.getItem('orders') || '[]'); setOrders(local); } catch (err) { setOrders([]); }
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div className="admin-orders fade-in">
      <div className="dashboard-header">
        <h1>Commandes <span>Ventes</span></h1>
        <p>Historique des commandes réalisées via la boutique.</p>
      </div>

      <div className="glass-effect table-container">
        <table className="admin-table">
          <thead>
            <tr><th>Numéro</th><th>Client</th><th>Articles</th><th>Montant</th><th>Date</th></tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="5" className="text-center">Aucune commande trouvée.</td></tr>
            ) : orders.map(o => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>
                  <div className="client-info">
                    <strong>{o.customer_name}</strong>
                    <span>{o.customer_email}</span>
                  </div>
                </td>
                <td>{o.items?.map(i => i.artwork?.title || i.title).join(', ')}</td>
                <td>€{(Number(o.total_amount || 0)).toFixed(2)}</td>
                <td>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
