import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { getAllPaintings } from '../services/paintings';

const AdminShop = () => {
  const [paintings, setPaintings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [form, setForm] = useState({ title: '', artist_id: '', style: '', price: 0, status: 'available', image: '', dimensions: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/paintings');
      setPaintings(res.data);
    } catch (e) {
      const fallback = await getAllPaintings();
      setPaintings(fallback);
    }

    try {
      const res2 = await api.get('/artists');
      setArtists(res2.data);
    } catch (e) {
      // no-op
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/paintings/${editingId}`, form);
      } else {
        await api.post('/paintings', form);
      }
      setForm({ title: '', artist_id: '', style: '', price: 0, status: 'available', image: '', dimensions: '', description: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error('Error saving painting', err);
      alert('Impossible d\'enregistrer la peinture (backend absent ?).');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette peinture ?')) return;
    try { await api.delete(`/paintings/${id}`); fetchData(); }
    catch (err) { console.error(err); alert('Erreur suppression.'); }
  };

  return (
    <div className="admin-shop fade-in">
      <div className="dashboard-header">
        <h1>Gestion <span>Boutique</span></h1>
        <p>Ajoutez, éditez ou supprimez des peintures.</p>
      </div>

      <div className="glass-effect form-card">
        <h3>{editingId ? 'Modifier une peinture' : 'Nouvelle peinture'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>Titre</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="form-group"><label>Artiste</label>
              <select value={form.artist_id} onChange={e => setForm({ ...form, artist_id: e.target.value })}>
                <option value="">— Sélectionner —</option>
                {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Style</label><input value={form.style} onChange={e => setForm({ ...form, style: e.target.value })} /></div>
            <div className="form-group"><label>Prix (€)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} /></div>
          </div>
          <div className="form-group"><label>Dimensions</label><input value={form.dimensions} onChange={e => setForm({ ...form, dimensions: e.target.value })} /></div>
          <div className="form-group"><label>Image URL</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} /></div>
          <div className="form-group"><label>Description</label><textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-primary" type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
            {editingId && <button type="button" className="btn-secondary" onClick={() => { setEditingId(null); setForm({ title: '', artist_id: '', style: '', price: 0, available: true, image: '', dimensions: '', description: '' }); }}>Annuler</button>}
          </div>
        </form>
      </div>

      <div className="glass-effect table-container">
        <table className="admin-table">
          <thead><tr><th>Titre</th><th>Artiste</th><th>Prix</th><th>Disponible</th><th>Actions</th></tr></thead>
          <tbody>
            {paintings.map(p => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.artist || (artists.find(a => String(a.id) === String(p.artist_id))?.name) || '—'}</td>
                <td>€{p.price}</td>
                <td>
                  <span className={`status-badge ${p.status}`}>
                    {p.status === 'sold' ? 'Vendu' : 'Disponible'}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-icon" onClick={() => { setEditingId(p.id); setForm({ title: p.title, artist_id: p.artist_id || '', style: p.style || '', price: p.price || 0, status: p.status || 'available', image: p.image_path || p.image || '', dimensions: p.dimensions || '', description: p.description || '' }); }}>✏️</button>
                  <button className="btn-icon" onClick={() => handleDelete(p.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminShop;
