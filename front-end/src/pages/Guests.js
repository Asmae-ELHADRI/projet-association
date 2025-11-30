import React, { useEffect, useState } from "react";
import { getGuests } from "../api/api";

const Guests = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    getGuests().then((res) => setGuests(res.data));
  }, []);

  return (
    <div className="guests-container">
      <h1>Nos invités</h1>

      <div className="guest-grid">
        {guests.map((g) => (
          <div className="guest-card" key={g.id}>
            <h3>{g.name}</h3>
            <p>{g.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guests;
