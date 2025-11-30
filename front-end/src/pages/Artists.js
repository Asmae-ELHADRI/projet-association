import React, { useEffect, useState } from "react";
import { getArtists } from "../api/api";

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getArtists().then((res) => setArtists(res.data));
  }, []);

  return (
    <div className="artists-container">
      <h1>Nos artistes</h1>

      <button className="apply-btn">
        <a href="/artist-apply">Rejoindre l’association</a>
      </button>

      <div className="artist-grid">
        {artists.map((artist) => (
          <div className="artist-card" key={artist.id}>
            <h3>{artist.name}</h3>
            <p>{artist.bio.substring(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
