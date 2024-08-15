import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGooglePay } from 'react-icons/fa';
import './PaymentPage.css';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handlePaymentSubmit = () => {
    if (selectedPayment) {
      if (selectedPayment === 'gpay') {
        setSuccessMessage(' Your order will be delivered to you soon');
        setShowQRCode(true);
      } else if (selectedPayment === 'cod') {
        setSuccessMessage('Your order has been confirmed with Cash on Delivery. We’ll process your order and get it to you soon!');
        setShowSuccess(true);
      }
    } else {
      alert('Please select a payment method.');
    }
  };

  const handleCloseQRCode = () => {
    setShowQRCode(false);
    setShowSuccess(true); // Show success message after closing QR code modal
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate('/confirmorder'); // Navigate to the confirmation page
  };

  return (
    <div className="payment-container">
      <h2>Choose Your Payment Method</h2>
      <div className="payment-options">
        <div
          className={`payment-option ${selectedPayment === 'gpay' ? 'selected' : ''}`}
          onClick={() => handlePaymentSelect('gpay')}
        >
          <FaGooglePay size={50} />
          <span>Google Pay</span>
        </div>
        <div
          className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`}
          onClick={() => handlePaymentSelect('cod')}
        >
          <span>Cash on Delivery</span>
        </div>
      </div>
      <button onClick={handlePaymentSubmit} className="payment-btn">
        Proceed to Pay
      </button>

      {showQRCode && (
        <div className="qr-modal">
          <div className="qr-content">
            <h3>Scan to Pay</h3>
            <img
              src={require('../assets/madhunagpay.jpg')}
              alt="GPay QR Code"
              className="qr-img"
            />
            <button onClick={handleCloseQRCode} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="success-modal">
          <div className="success-content">
            <h3>Payment Successful</h3>
            <img
              src={require('../assets/success-order.gif')}
              alt="Success"
              className="success-img"
            />
            <p>{successMessage}</p>
            <button onClick={handleCloseSuccess} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
