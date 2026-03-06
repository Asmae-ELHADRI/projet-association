import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { addToCart } from '../services/cart';
import { FiArrowLeft, FiShoppingCart, FiInfo, FiMaximize, FiUser } from 'react-icons/fi';
import '../styles/Shop.css';

const PaintingDetail = () => {
  const { id } = useParams();
  const [painting, setPainting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPainting = async () => {
      try {
        const res = await api.get(`/paintings/${id}`);
        setPainting(res.data);
      } catch (err) {
        console.error("Error fetching painting:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPainting();
  }, [id]);

  if (loading) return (
    <div className="loading-state">
      <div className="spinner"></div>
      <p>Chargement de l'œuvre...</p>
    </div>
  );

  if (!painting) return (
    <div className="container section-padding text-center">
      <h2>Peinture introuvable</h2>
      <Link to="/shop" className="btn-primary">Retour à la boutique</Link>
    </div>
  );

  return (
    <div className="painting-detail-page fade-in-up">
      <section className="detail-hero-section">
        <div className="container">
          <Link to="/shop" className="premium-back-link">
            <span>←</span> Retour à la collection
          </Link>

          <div className="detail-main-grid">
            <div className="detail-visuals">
              <div className="detail-image-premium glass-effect">
                <img src={painting.image_path || painting.image || '/images/placeholder.png'} alt={painting.title} />
                <div className="image-magnify-hint">
                  <FiMaximize /> Cliquez pour agrandir
                </div>
              </div>
            </div>

            <div className="detail-content-premium">
              <span className="subtitle-tag">{painting.style || 'Œuvre Originale'}</span>
              <h1 className="serif detail-main-title">{painting.title}</h1>

              <Link to={`/artists/${painting.artist_id}`} className="detail-artist-link">
                <div className="mini-avatar">
                  {painting.artist?.image_path ? <img src={painting.artist.image_path} alt="" /> : <span>{painting.artist?.name?.charAt(0) || 'A'}</span>}
                </div>
                <span>{painting.artist?.name || painting.artist || 'Artiste de l\'Association'}</span>
              </Link>

              <div className="detail-price-premium">
                <span className="price-value">{painting.price} MAD</span>
                <span className="price-label">TVA incluse</span>
              </div>

              <div className="detail-purchase-actions">
                <button
                  className="btn-primary btn-xl w-full"
                  onClick={() => { addToCart({ ...painting, quantity: 1 }); alert('Ajouté au panier'); }}
                >
                  <FiShoppingCart /> Ajouter au Panier
                </button>
              </div>

              <div className="detail-specs-grid glass-effect">
                <div className="spec-item">
                  <FiMaximize />
                  <div>
                    <span className="spec-label">Dimensions</span>
                    <span className="spec-value">{painting.dimensions || 'Non spécifié'}</span>
                  </div>
                </div>
                <div className="spec-item">
                  <FiInfo />
                  <div>
                    <span className="spec-label">Technique</span>
                    <span className="spec-value">{painting.technique || painting.style || 'Mixte'}</span>
                  </div>
                </div>
              </div>

              <div className="detail-story">
                <h3 className="serif">L'histoire de l'œuvre</h3>
                <div className="story-line"></div>
                <p>{painting.description || "Cette œuvre unique, créée avec passion par l'un de nos artistes membres, attend de trouver sa place dans votre collection personnelle."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaintingDetail;
