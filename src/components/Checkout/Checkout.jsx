// components/Checkout/Checkout.jsx
import React from 'react';
import { useCart } from '../../CartContext';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PfmXg2NGMtBaXU0anb1rb2LPPel6zPXCz06RHJpkkZgB2TbL3zFIbyBPPlp5a78WEwLUYgLuuVJd4S1ZCgrOC9x00bOtg5Gn6'); // Replace with your Stripe public key
const Checkout = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  const handleCheckout = async () => {
    const { data } = await axios.post('http://localhost:3000/checkout/create-checkout-session', {
      items: cart.map(item => ({
        name: item.name,
        price: item.regular_price,
        quantity: item.quantity || 1, // Default to 1 if quantity is undefined
      })),
    });

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

    if (error) {
      console.error('Stripe checkout error:', error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cart.map(item => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity || 1}</p> {/* Default to 1 if quantity is undefined */}
          <p>Price: ${item.regular_price}</p>
          <button onClick={() => increaseQuantity(item.id)}>+</button>
          <button onClick={() => decreaseQuantity(item.id)}>-</button>
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Checkout;
