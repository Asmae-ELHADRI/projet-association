import React, { useEffect, useState } from 'react';
import PaintingCard from '../components/shop/PaintingCard';
import Filters from '../components/shop/Filters';
import api from '../services/api';
import '../styles/Shop.css';

const Shop = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    style: '',
    artist_id: '',
  });

  const fetchPaintings = async (appliedFilters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(appliedFilters).toString();
      const res = await api.get(`/paintings?${params}`);
      setPaintings(res.data);
    } catch (err) {
      console.error("Error fetching paintings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchPaintings(newFilters);
  };

  return (
    <div className="shop-page">
      <section className="artists-hero shop-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2071')" }}>
        <div className="hero-overlay"></div>
        <div className="container fade-in-up">
          <span className="subtitle-tag on-dark">Marché d'Art</span>
          <h1 className="serif text-white">Boutique <span className="text-gradient">Orientale</span></h1>
          <p className="text-white-muted">Faites l'acquisition d'œuvres uniques et soutenez nos artistes locaux. Chaque pièce raconte une émotion.</p>
        </div>
      </section>

      <div className="container section-padding">
        <div className="shop-interface fade-in-up">
          <Filters onFilterChange={handleFilterChange} />

          {loading ? (
            <div className="loading-container-premium">
              <div className="premium-loader"></div>
              <p>Curating your collection...</p>
            </div>
          ) : (
            <div className="paintings-grid-premium fade-in-up">
              {paintings.length === 0 ? (
                <div className="no-results-premium glass-effect">
                  <p>Aucune œuvre ne correspond à votre recherche pour le moment.</p>
                  <button className="btn-secondary" onClick={() => handleFilterChange({})}>Voir toute la collection</button>
                </div>
              ) : (
                paintings.map(p => <PaintingCard key={p.id} painting={p} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
