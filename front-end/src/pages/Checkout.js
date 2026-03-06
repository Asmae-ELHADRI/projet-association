import React, { useState } from 'react';
import { getCart, clearCart } from '../services/cart';
import { createOrder } from '../services/orders';
import { useNavigate, Link } from 'react-router-dom';
import { FiCreditCard, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import '../styles/Shop.css';

const Checkout = () => {
  const navigate = useNavigate();
  const items = getCart();
  const total = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);

    const orderData = {
      customer_name: formData.get('name'),
      customer_email: formData.get('email'),
      customer_address: formData.get('address'),
      items: items.map(item => ({
        artwork_id: item.id,
        quantity: item.quantity || 1
      }))
    };

    try {
      const res = await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation', { state: { order: res.data } });
    } catch (err) {
      setError('Erreur lors de la commande: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return (
    <div className="container section-padding text-center">
      <h2>Votre panier est vide</h2>
      <Link to="/shop" className="btn-primary mt-4">Retour à la boutique</Link>
    </div>
  );

  return (
    <div className="checkout-page fade-in-up">
      <section className="cart-hero-mini section-padding pb-0">
        <div className="container">
          <Link to="/cart" className="premium-back-link">
            <span>←</span> Retour au panier
          </Link>
          <h1 className="serif mt-4">Finaliser <span className="text-gradient">votre acquisition</span></h1>
        </div>
      </section>

      <section className="container section-padding">
        <div className="checkout-main-grid-premium">
          <div className="checkout-form-column">
            <div className="checkout-card-premium glass-effect fade-in-up">
              <h2 className="serif mb-4"><FiTruck /> Résidence de livraison</h2>
              <div className="header-line mb-5"></div>

              <form onSubmit={placeOrder} className="premium-form">
                <div className="premium-form-group">
                  <label>Nom complet du destinataire</label>
                  <input name="name" type="text" placeholder="Ex: M. Ahmed Benjelloun" required />
                </div>

                <div className="premium-form-row">
                  <div className="premium-form-group">
                    <label>Adresse Email pour le suivi</label>
                    <input name="email" type="email" placeholder="votre@email.com" required />
                  </div>
                  <div className="premium-form-group">
                    <label>Téléphone de contact</label>
                    <input name="phone" type="tel" placeholder="+212 6 XX XX XX XX" required />
                  </div>
                </div>

                <div className="premium-form-group">
                  <label>Adresse de livraison complète</label>
                  <textarea name="address" rows="4" placeholder="Rue, Quartier, Ville, Code Postal (Maroc)" required></textarea>
                </div>

                <div className="payment-badge-premium">
                  <FiCreditCard />
                  <p>
                    <strong>Paiement Sécurisé</strong><br />
                    L'acquisition se finalise par virement bancaire ou paiement à la livraison après validation téléphonique de notre galeriste.
                  </p>
                </div>

                {error && <div className="error-message-premium mb-4">{error}</div>}

                <button type="submit" className="btn-primary btn-xl w-full" disabled={loading}>
                  {loading ? "Sécurisation..." : "Confirmer l'Acquisition"}
                </button>
              </form>
            </div>
          </div>

          <aside className="checkout-summary-column">
            <div className="order-summary-premium glass-effect sticky-info">
              <h3 className="serif"><FiPackage /> Votre Acquisition</h3>
              <div className="header-line mb-4"></div>

              <div className="summary-items-list-premium">
                {items.map(it => (
                  <div key={it.id} className="mini-item-row">
                    <span className="it-name">{it.title} <small>x{it.quantity || 1}</small></span>
                    <span className="it-price">{(it.price * (it.quantity || 1)).toLocaleString()} MAD</span>
                  </div>
                ))}
              </div>

              <div className="sum-total-premium it-total-label">
                <span>Total à régler</span>
                <span className="serif">{total.toLocaleString()} MAD</span>
              </div>

              <div className="checkout-guarantee text-center">
                <FiCheckCircle style={{ color: '#10b981', marginBottom: '10px' }} />
                <p className="small-info">Transaction hautement sécurisée par l'Association L'Orientale Espace.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
