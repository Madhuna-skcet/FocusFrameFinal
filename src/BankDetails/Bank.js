import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { auth, db } from '../Firebase'; // Import your Firebase configuration
import './Bank.css';  // Make sure to add styles for the success message and image

const BankDetailsForm = () => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    routingNumber: '',
    iban: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({
      ...bankDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = auth.currentUser; // Get the current logged-in user

      if (user) {
        const sellerId = user.uid; // Get the seller's unique ID

        // Save bank details under the correct seller ID in Firebase Realtime Database
        await set(ref(db, `Sellers/${sellerId}/bankDetails`), {
          bankName: bankDetails.bankName,
          accountHolderName: bankDetails.accountHolderName,
          accountNumber: bankDetails.accountNumber,
          routingNumber: bankDetails.routingNumber,
          iban: bankDetails.iban,
        });

        setIsSubmitted(true); // Set the submission status to true
      } else {
        console.error("No seller is logged in.");
      }
    } catch (error) {
      console.error("Error adding bank details: ", error);
    }
  };

  return (
    <div id='abc'>
    <div className="bank-details-form-wrapper">
      <div className="marquee">
        <p>Your information is secure with us! All transactions are encrypted and protected.</p>
      </div>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="bank-details-form">
          <div>
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={bankDetails.bankName}
              onChange={handleChange}
              required
              placeholder="Enter your bank name"
            />
          </div>

          <div>
            <label>Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              value={bankDetails.accountHolderName}
              onChange={handleChange}
              required
              placeholder="Enter account holder's name"
            />
          </div>

          <div>
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleChange}
              required
              placeholder="Enter your account number"
            />
          </div>

          <div>
            <label>Routing Number</label>
            <input
              type="text"
              name="routingNumber"
              value={bankDetails.routingNumber}
              onChange={handleChange}
              required
              placeholder="Enter your routing number"
            />
          </div>

          <div>
            <label>IBAN (if applicable)</label>
            <input
              type="text"
              name="iban"
              value={bankDetails.iban}
              onChange={handleChange}
              placeholder="Enter IBAN if applicable"
            />
          </div>

          <button type="submit">Submit Bank Details</button>
        </form>
      ) : (
        <div className="success-message">
          <img src="../assets/success-order.gif" alt="Success" className="success-image" />
          <p>Your bank details have been added successfully!</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default BankDetailsForm;
