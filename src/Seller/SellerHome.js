import React, { useState, useEffect } from 'react';
import './SellerHome.css';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../Firebase';

const SellerHome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(''); // Initialize with empty string
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchSellerData = async () => {
      const user = auth.currentUser;
      if (user) {
        const sellerRef = ref(db, `Sellers/${user.uid}`);
        onValue(sellerRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUsername(data.username || 'Seller'); // Ensure correct field name
            setLoading(false); // Data loaded
          } else {
            setUsername('Seller');
            setLoading(false); // Data loaded
          }
        }, {
          onlyOnce: true // Fetch data only once
        });
      } else {
        setUsername('Seller');
        setLoading(false); // Data loaded
      }
    };

    fetchSellerData();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading message
  }

  return (
    <>
      <div className="marquee">
        <p>Your information is secure with us! All transactions are encrypted and protected.</p>
      </div>
      <div className="seller-home">
        <header className="seller-home-header">
          <h1 className="seller-home-title">Welcome, {username}!</h1>
          <p className="seller-home-subtitle">Manage your store with ease and efficiency.</p>
        </header>
        
        <section className="seller-home-content">
          <div className="seller-home-card">
            <div className="card-icon">📦</div>
            <h2 className="card-title">Manage Products</h2>
            <p className="card-description">Add, edit, or remove products from your inventory.</p>
            <button className="card-button" onClick={() => handleNavigate('/sform')}>Manage Products</button>
          </div>        
          <div className="seller-home-card">
            <div className="card-icon">🏦</div>
            <h2 className="card-title">Bank Details</h2>
            <p className="card-description">Enter your bank information to process payments securely.</p>
            <button className="card-button" onClick={() => handleNavigate('/sbank')}>Add Bank Information</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default SellerHome;
