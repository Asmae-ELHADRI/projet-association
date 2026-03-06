import React from 'react';
import { getCart, removeFromCart, updateQuantity, clearCart } from '../services/cart';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinusCircle, FiPlusCircle, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import '../styles/Shop.css';

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = React.useState(getCart());

  const refresh = () => { setItems(getCart()); };

  const onRemove = (id) => { removeFromCart(id); refresh(); };
  const onChange = (id, q) => { if (q < 1) return; updateQuantity(id, q); refresh(); };

  const total = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

  return (
    <div className="cart-page fade-in-up">
      <section className="cart-hero-mini section-padding pb-0">
        <div className="container">
          <Link to="/shop" className="premium-back-link">
            <span>←</span> Continuer mes découvertes
          </Link>
          <h1 className="serif mt-4">Votre <span className="text-gradient">Galerie Privée</span></h1>
        </div>
      </section>

      <section className="container section-padding">
        {items.length === 0 ? (
          <div className="empty-cart-premium glass-effect text-center fade-in">
            <div className="empty-visual">
              <FiShoppingBag />
            </div>
            <h2 className="serif">Votre panier est vierge</h2>
            <p>Laissez-vous séduire par les œuvres de nos talentueux artistes et commencez votre collection.</p>
            <Link to="/shop" className="btn-primary btn-lg mt-4">Explorer la Boutique</Link>
          </div>
        ) : (
          <div className="cart-main-grid-premium">
            <div className="cart-items-column">
              {items.map(it => (
                <div key={it.id} className="premium-cart-item glass-effect fade-in-up">
                  <div className="item-visual-premium">
                    <img src={it.image_path || it.image || '/images/placeholder.png'} alt={it.title} />
                  </div>
                  <div className="item-details-premium">
                    <div className="it-header">
                      <div>
                        <h3 className="serif">{it.title}</h3>
                        <p className="it-artist-name">{it.artist?.name || 'Artiste de l\'Association'}</p>
                      </div>
                      <button className="btn-remove-premium" onClick={() => onRemove(it.id)}>
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="it-footer-premium">
                      <div className="it-quantity-control">
                        <button className="q-btn" onClick={() => onChange(it.id, (it.quantity || 1) - 1)}><FiMinusCircle /></button>
                        <span className="q-val">{it.quantity || 1}</span>
                        <button className="q-btn" onClick={() => onChange(it.id, (it.quantity || 1) + 1)}><FiPlusCircle /></button>
                      </div>
                      <div className="it-price-premium serif">
                        {(it.price * (it.quantity || 1)).toLocaleString()} MAD
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-sidebar-premium">
              <div className="summary-card-premium glass-effect sticky-info">
                <h3 className="serif">Total de la commande</h3>
                <div className="summary-line"></div>

                <div className="sum-row">
                  <span>Sous-total</span>
                  <span>{total.toLocaleString()} MAD</span>
                </div>
                <div className="sum-row">
                  <span>Livraison</span>
                  <span className="text-success">Offerte</span>
                </div>

                <div className="sum-total-premium">
                  <span>Total</span>
                  <span className="serif">{total.toLocaleString()} MAD</span>
                </div>

                <button className="btn-primary btn-xl w-full" onClick={() => navigate('/checkout')}>
                  Passer à la Caisse <FiArrowRight />
                </button>

                <div className="cart-guarantees">
                  <p>✦ Certificat d'authenticité inclus</p>
                  <p>✦ Livraison sécurisée et assurée</p>
                </div>

                <button className="btn-text-muted w-full" onClick={() => { if (window.confirm('Vider votre galerie ?')) { clearCart(); refresh(); } }}>
                  Vider le panier
                </button>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
