const CART_KEY = 'shop_cart_v1';

function read(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }catch(e){ return []; }
}

function write(v){ localStorage.setItem(CART_KEY, JSON.stringify(v)); }

export function getCart(){ return read(); }

export function addToCart(item){
  const cart = read();
  const idx = cart.findIndex(c=>String(c.id) === String(item.id));
  if(idx >= 0){ cart[idx].quantity = (cart[idx].quantity || 1) + (item.quantity || 1); }
  else cart.push({ ...item, quantity: item.quantity || 1 });
  write(cart);
}

export function removeFromCart(id){ const cart = read().filter(i=>String(i.id)!==String(id)); write(cart); }

export function updateQuantity(id, quantity){
  const cart = read();
  const idx = cart.findIndex(c=>String(c.id) === String(id));
  if(idx >= 0){ cart[idx].quantity = Math.max(1, quantity); write(cart); }
}

export function clearCart(){ write([]); }
