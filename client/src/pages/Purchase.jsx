import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function removeItem(id) {
    setCart(cart.filter(c => c.id !== id));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem('cart');
  }

  async function handleCheckout() {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      if (token) {
        // Attempt to purchase each course by calling backend
        for (const item of cart) {
          try {
            await API.post(`/users/courses/${item.id}`);
          } catch (err) {
            console.error('Purchase failed for', item.id, err?.response?.data || err.message);
            alert(`Failed to purchase ${item.title}.`);
          }
        }
        // After purchases, clear cart and add to purchasedCourses in localStorage for local reference
        const purchased = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
        const newPurchased = [...purchased, ...cart.map(c => ({ ...c, purchasedAt: new Date().toISOString() }))];
        localStorage.setItem('purchasedCourses', JSON.stringify(newPurchased));
        clearCart();
        alert('Purchase completed. Check your Dashboard.');
        navigate('/dashboard');
      } else {
        // Guest flow: store purchased locally and clear cart
        const purchased = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
        const newPurchased = [...purchased, ...cart.map(c => ({ ...c, purchasedAt: new Date().toISOString() }))];
        localStorage.setItem('purchasedCourses', JSON.stringify(newPurchased));
        clearCart();
        alert('Purchase saved locally. Log in to sync with your account.');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  }

  const total = cart.reduce((s, c) => s + (c.price || 0), 0);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 16 }}>
      <h2>Purchase / Cart</h2>
      {cart.length === 0 ? (
        <div style={{ padding: 20, color: 'var(--text-secondary)' }}>Your cart is empty. Browse courses to add.</div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 10 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                <div style={{ color: 'var(--text-secondary)' }}>₹{item.price}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={() => removeItem(item.id)} className="btn-outline">Remove</button>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
            <div style={{ fontWeight: 700 }}>Total: ₹{total}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={clearCart} className="btn-outline">Clear</button>
              <button onClick={handleCheckout} disabled={loading} className="btn-primary">{loading ? 'Processing...' : 'Checkout'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
