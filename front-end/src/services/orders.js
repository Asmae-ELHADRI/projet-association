const API_BASE = '/api/orders';

export async function createOrder(orderData) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(orderData)
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create order');
  }
  
  return await res.json();
}

export async function getOrders() {
    const res = await fetch(API_BASE);
    if(!res.ok) throw new Error('network');
    return await res.json();
}
