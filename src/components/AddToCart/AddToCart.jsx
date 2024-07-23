import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext';

const AddToCart = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    const inCart = isInCart(product.name);
    setIsProductInCart(inCart);
    
  }, [product, isInCart]);

  const handleClick = () => {
    
    if (isProductInCart) {
      removeFromCart(product.name); // Use product name for removal
      
    } else {
      addToCart(product);
      
    }
    setIsProductInCart(!isProductInCart); // Toggle cart status
  };

  return (
    <button onClick={handleClick}>
      {isProductInCart ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  );
};

export default AddToCart;
