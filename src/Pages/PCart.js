// PCart.js
import React from 'react';
import './PCart.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const PCart = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleIncrement = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch({ type: 'DECREMENT_QUANTITY', payload: item });
    }
  };

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const handleExplore = () => {
    navigate('/explore');
  };

  const next = () => {
    navigate('/orders'); // Adjust the path as needed
  };

  return (
    <div className="cart-container">
      <div className="cart-content">
        {state.cartItems.length > 0 ? (
          state.cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <div className="quantity-control">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                </div>
              </div>
              <div className="item-price">
                <span className="current-price">₹{item.price * item.quantity}</span>
                <span className="original-price">₹{item.originalPrice * item.quantity}</span>
                <button className="remove-btn" onClick={() => handleRemove(item)}>
                  Remove from Bag
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <img src="https://i.pinimg.com/564x/81/c4/fc/81c4fc9a4c06cf57abf23606689f7426.jpg" alt="Empty Bag" />
            <p>Hey, it feels so light! There's nothing in your bag. Let's add some items.</p>
            <button className="explore-btn" onClick={handleExplore}>Explore</button>
          </div>
        )}

        {state.cartItems.length > 0 && (
          <div className="price-details">
            <h2>Price Details</h2>
            <div className="price-row">
              <span>Items ({state.cartItems.length})</span>
              <span>₹{state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>₹{state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
            </div>
            <button className="checkout-btn" onClick={next}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PCart;
