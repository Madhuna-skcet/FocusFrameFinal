import React, { useState } from 'react';
import './Order.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext'; // Import the useCart hook

const OrderSummary = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const { state } = useCart(); // Get the cart state from the context

  // Calculate totals
  const subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = state.cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const total = subtotal - discount;

  const handlePlaceOrder = () => {
    setShowAlert(true);
  };

  return (
    <div className="order-summary-container p-8 max-w-4xl mx-auto bg-gray-50">
      <div className="order-summary-section mt-8">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {state.cartItems.length > 0 ? (
          state.cartItems.map(item => (
            <div key={item.id} className="product-details flex items-center p-4 bg-white rounded shadow-md mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 rounded-full border border-gray-300" />
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="line-through text-gray-400">₹{item.originalPrice}</p>
                <p>₹{item.price}</p>
                <p>x{item.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty!</p>
          </div>
        )}

        <div className="order-calculation p-4 bg-white rounded shadow-md">
          <div className="flex justify-between">
            <p>Total Products</p>
            <p>{state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Discount</p>
            <p>-₹{discount}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charges</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <p>Total</p>
            <p>₹{total}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-black text-white px-6 py-3 rounded-full mt-8"
      >
        Place Order
      </button>

      {showAlert && (
        <div className="alert-box fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="alert-content bg-white p-8 rounded shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p><strong>Total Products:</strong> {state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
            <p><strong>Subtotal:</strong> ₹{subtotal}</p>
            <p><strong>Discount:</strong> -₹{discount}</p>
            <p><strong>Delivery Charges:</strong> Free</p>
            <p><strong>Total:</strong> ₹{total}</p>
            <button
              onClick={() => {
                setShowAlert(false);
                navigate('/address');
              }}
              className="bg-black text-white px-4 py-2 rounded-full mt-4"
            >
             Add Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
