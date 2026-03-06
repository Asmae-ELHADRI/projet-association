const API_BASE = '/api/paintings';

export async function getAllPaintings(){
  try{
    const res = await fetch(API_BASE);
    if(!res.ok) throw new Error('network');
    return await res.json();
  }catch(e){
    // Fallback: sample data so UI works without backend
    return [
      { id: '1', title: 'Paysage lumineux', artist: 'A. Dupont', style: 'Impressionnisme', price: 1500, dimensions: '60x80', description: 'Une belle scène.', image: '/images/sample1.jpg' },
      { id: '2', title: 'Portrait bleu', artist: 'M. Martin', style: 'Moderne', price: 800, dimensions: '50x70', description: 'Portrait expressif.', image: '/images/sample2.jpg' }
    ];
  }
}

export async function getPaintingById(id){
  try{
    const res = await fetch(`${API_BASE}/${id}`);
    if(!res.ok) throw new Error('network');
    return await res.json();
  }catch(e){
    const list = await getAllPaintings();
    return list.find(p=>String(p.id) === String(id)) || null;
  }
}
