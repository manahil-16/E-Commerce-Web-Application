import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product._id === product._id);
      const updated = existing
        ? prev.map(i => i.product._id === product._id 
            ? { ...i, quantity: i.quantity + qty } : i)
        : [...prev, { product, quantity: qty }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.product._id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}