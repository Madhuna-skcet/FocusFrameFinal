import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { db, auth } from '../Firebase'; // Import necessary Firebase modules
import { ref, set } from 'firebase/database'; // Import Firebase Realtime Database functions
import './Oc.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const { state } = useCart();

  // Calculate totals
  const subtotal = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = state.cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const total = subtotal - discount;

  useEffect(() => {
    const storeOrderDetails = async () => {
      const user = auth.currentUser; // Get the current user
      if (user) {
        const userId = user.uid; // Get user ID
        const orderRef = ref(db, `users/${userId}/orders/${Date.now()}`); // Create a reference to the orders node

        await set(orderRef, {
          subtotal,
          discount,
          total,
          items: state.cartItems,
          timestamp: new Date().toISOString(),
        });
      }
    };

    storeOrderDetails();
  }, [state.cartItems, subtotal, discount, total]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/history');
  };

  return (
    <div className="oc-container">
      <div className="oc-header">
        <h2>Thank You for Your Purchase!</h2>
        <p>Your order has been placed successfully.</p>
      </div>

      <div className="oc-summary">
        <h3>Order Summary</h3>
        {state.cartItems.length > 0 ? (
          <div className="oc-items">
            {state.cartItems.map(item => (
              <div key={item.id} className="item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-original-price">₹{item.originalPrice}</p>
                  <p className="item-price">₹{item.price}</p>
                  <p className="item-quantity">x{item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="oc-calculation">
              <div className="calc-item">
                <p>Total Products</p>
                <p>{state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
              </div>
              <div className="calc-item">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="calc-item discount">
                <p>Discount</p>
                <p>-₹{discount.toFixed(2)}</p>
              </div>
              <div className="calc-item">
                <p>Delivery Charges</p>
                <p>Free</p>
              </div>
              <div className="calc-item total">
                <p>Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="oc-empty">
            <p>No items found in your order.</p>
          </div>
        )}
      </div>

      <div className="oc-buttons">
        <button onClick={handleContinueShopping} className="btn-continue">
          Continue Shopping
        </button>
        <button onClick={handleViewOrders} className="btn-view">
          View Order History
        </button>
      </div>

      {showAlert && (
        <div className="oc-alert">
          <div className="alert-content">
            <h2>Order Summary</h2>
            <p><strong>Total Products:</strong> {state.cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
            <p><strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}</p>
            <p><strong>Discount:</strong> -₹{discount.toFixed(2)}</p>
            <p><strong>Delivery Charges:</strong> Free</p>
            <p><strong>Total:</strong> ₹{total.toFixed(2)}</p>
            <button onClick={() => {
              setShowAlert(false);
              navigate('/address');
            }} className="btn-alert">
              Add Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
