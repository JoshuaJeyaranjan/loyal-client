import React from 'react';
import { useCart } from '../../CartContext'; // Adjust path as needed
import './Cart.scss';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <h2>{item.name}</h2>
              <img src={item.default_image} alt={item.name} />
              <p>Price: ${item.regular_price}</p>
              {item.sale_price && <p>Sale Price: ${item.sale_price}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
