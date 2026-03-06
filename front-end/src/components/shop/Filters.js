import React, { useMemo, useState } from 'react';

export default function Filters({ items = [], onChange }) {
  const [artist, setArtist] = useState('');
  const [style, setStyle] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const artists = useMemo(() => Array.from(new Set(items.map(i => i.artist).filter(Boolean))), [items]);
  const styles = useMemo(() => Array.from(new Set(items.map(i => i.style).filter(Boolean))), [items]);

  function apply() {
    let out = items.slice();
    if (artist) out = out.filter(i => i.artist === artist);
    if (style) out = out.filter(i => i.style === style);
    if (maxPrice) out = out.filter(i => (i.price || 0) <= Number(maxPrice));
    onChange(out);
  }

  function reset() { setArtist(''); setStyle(''); setMaxPrice(''); onChange(items); }

  return (
    <div className="shop-filters-premium glass-effect">
      <div className="filter-group-premium">
        <label>Artiste</label>
        <select value={artist} onChange={e => setArtist(e.target.value)}>
          <option value="">Tous les artistes</option>
          {artists.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="filter-group-premium">
        <label>Style</label>
        <select value={style} onChange={e => setStyle(e.target.value)}>
          <option value="">Tous les styles</option>
          {styles.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="filter-group-premium">
        <label>Prix Maximum</label>
        <input
          placeholder="Ex: 5000"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          type="number"
        />
      </div>

      <div className="filter-actions-premium">
        <button className="btn-apply-filters" onClick={apply}>Filtrer</button>
        <button className="btn-reset-filters" onClick={reset}>Réinitialiser</button>
      </div>
    </div>
  );
}
