import React from 'react';
import { Link } from 'react-router-dom';

export default function PaintingCard({ painting }) {
  if (!painting) return null;
  return (
    <div className="painting-card-premium fade-in-up">
      <Link to={`/shop/${painting.id}`} className="painting-img-wrapper">
        <img
          src={painting.image_path || painting.image || '/images/placeholder.png'}
          alt={painting.title}
          className="painting-img"
        />
        <div className="painting-badge-status">
          {painting.status === 'sold' ? 'Vendu' : 'Disponible'}
        </div>
      </Link>
      <div className="painting-meta-premium">
        <span className="p-artist-name">{painting.artist?.name || painting.artist || 'Artiste de l\'Association'}</span>
        <Link to={`/shop/${painting.id}`}>
          <h3 className="serif">{painting.title}</h3>
        </Link>
        <div className="p-footer-premium">
          <span className="p-price-tag">{painting.price} MAD</span>
          <Link to={`/shop/${painting.id}`} className="p-view-link">
            Détails <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
