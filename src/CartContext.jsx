import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.name === product.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Set quantity to 1 by default
      }
    });
  };

  const removeFromCart = (productName) => {
    setCart((prevCart) => prevCart.filter(item => item.name !== productName));
  };

  const increaseQuantity = (productName) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productName) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.name === productName
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const isInCart = (productName) => {
    const inCart = cart.some((item) => item.name === productName);
    return inCart;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};
