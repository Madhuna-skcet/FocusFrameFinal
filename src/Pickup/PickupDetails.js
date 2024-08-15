import React, { useState } from 'react';
import './pc.css';

const PickupDetails = () => {
  const [pickupDetails, setPickupDetails] = useState({
    contactName: '',
    contactPhone: '',
    email: '',
    pickupAddress: '',
    pickupFrom: '',
    pickupPoint: '',
    pickupTime: '',
    idRequired: false,
    authorization: '',
    specialInstructions: '',
    aadhaarFile: null,
  });

  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setPickupDetails({
      ...pickupDetails,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleConfirmPickup = (e) => {
    e.preventDefault();
    setAddressConfirmed(true);

    if (pickupDetails.idRequired && pickupDetails.aadhaarFile) {
      // Handle the file upload logic here, e.g., uploading to a server or cloud storage
      console.log('Aadhaar file uploaded:', pickupDetails.aadhaarFile.name);
    }

    // Set confirmation message
    setConfirmationMessage('Your details are stored successfully. Our team will come to get your product, and we will handle the payment online.');
  };

  return (
    <div style={{backgroundColor:"#e0c3fc"}}>
    <div className="pickup-details-wrapper">
      <h2 className="pickup-heading">Pickup Details</h2>
      <form onSubmit={handleConfirmPickup} className="pickup-form">
        <div className="form-group">
          <label>Contact Name</label>
          <input
            type="text"
            name="contactName"
            value={pickupDetails.contactName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Phone Number</label>
          <input
            type="tel"
            name="contactPhone"
            value={pickupDetails.contactPhone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Email for Pickup Confirmation</label>
          <input
            type="email"
            name="email"
            value={pickupDetails.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Pickup Address</label>
          <input
            type="text"
            name="pickupAddress"
            value={pickupDetails.pickupAddress}
            onChange={handleChange}
            placeholder="Enter pickup address"
            required
          />
        </div>

        <div className="form-group">
          <label>Pickup From (Store Name or Location)</label>
          <input
            type="text"
            name="pickupFrom"
            value={pickupDetails.pickupFrom}
            onChange={handleChange}
            placeholder="Enter store name or location"
            required
          />
        </div>

        <div className="form-group">
          <label>Select Pickup Point</label>
          <input
            type="text"
            name="pickupPoint"
            value={pickupDetails.pickupPoint}
            onChange={handleChange}
            placeholder="Enter pickup point (e.g., 10:00 AM)"
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="idRequired"
            checked={pickupDetails.idRequired}
            style={{ width: "5%" }}
            onChange={handleChange} 
          />
          <label>Identification Required for Pickup</label>
        </div>

        {pickupDetails.idRequired && (
          <div className="form-group">
            <label>Upload Aadhaar Details</label>
            <input
              type="file"
              name="aadhaarFile"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <label>Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={pickupDetails.specialInstructions}
            onChange={handleChange}
            placeholder="Enter any special instructions"
          />
        </div>

        <button type="submit" className="card-button">Confirm Pickup Address</button>
      </form>

      {addressConfirmed && (
        <div className="confirmation-message">
          <p>{confirmationMessage}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default PickupDetails;
