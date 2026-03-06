import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiHome } from 'react-icons/fi';
import '../styles/Shop.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="confirmation-page page-enter">
      <div className="container section-padding text-center">
        <div className="success-container glass-effect fade-in">
          <div className="success-icon-large">
            <FiCheckCircle />
          </div>
          <h1>Commande <span>Confirmée !</span></h1>
          <p className="success-msg">Merci pour votre achat. Votre commande a été enregistrée avec succès.</p>

          {order && (
            <div className="order-details-recap glass-effect">
              <h3>Récapitulatif de la commande</h3>
              <p>Référence : <strong>#{order.id}</strong></p>
              <p>Montant total : <strong>€{order.total_amount}</strong></p>
              <p className="notice">Un email de confirmation vous a été envoyé à {order.customer_email}.</p>
            </div>
          )}

          <div className="confirmation-actions">
            <Link to="/shop" className="btn-primary">
              Retour à la boutique <FiArrowRight />
            </Link>
            <Link to="/" className="btn-text">
              <FiHome /> Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
