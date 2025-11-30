import React, { useState } from "react";
import { sendMessage } from "../api/api";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(data).then(() => alert("Message envoyé !"));
  };

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom complet"
          required
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <textarea
          placeholder="Message"
          required
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
