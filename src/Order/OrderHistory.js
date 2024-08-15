import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { auth, db } from '../Firebase'; // Import Firebase modules
import OrderDetailsModal from './OrderDetailsModal'; // Import your modal
import './Oh.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const ordersRef = ref(db, `users/${userId}/orders`);
          const snapshot = await get(ordersRef);

          if (snapshot.exists()) {
            setOrders(Object.values(snapshot.val())); // Convert orders object to array
          } else {
            setOrders([]);
          }
        }
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-summary">
              <h3>Order #{order.timestamp}</h3>
              <p>Date: {new Date(order.timestamp).toLocaleDateString()}</p>
              <p>Status: {order.status || 'Pending'}</p>
              <p>Total Amount: ₹{order.total.toFixed(2)}</p>
              <button onClick={() => handleViewDetails(order)}>View Details</button>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OrderHistory;
