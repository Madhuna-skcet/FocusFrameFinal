import React from 'react';
import './Om.css'; // Add your own styles

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="order-details-modal">
      <div className="order-details-content">
        <h3>Order #{order.timestamp} Details</h3>
        <p>Date: {new Date(order.timestamp).toLocaleDateString()}</p>
        <p>Status: {order.status || 'Pending'}</p>
        <p>Total Amount: ₹{order.total.toFixed(2)}</p>
        <h4>Items:</h4>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity} - Price: ₹{item.price}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="btn-close">Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
