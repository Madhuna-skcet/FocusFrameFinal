import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase'; // Import Firebase auth and database
import { ref, set, push, onValue, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import './Address.css';

const Address = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('address');
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    mobile: '',
    flatHouse: '',
    areaColony: '',
    townCity: '',
    pinCode: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [user, setUser] = useState(null);

  // Listen to user authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchAddresses(currentUser.uid); // Fetch addresses when user is authenticated
      } else {
        setUser(null);
      }
    });
  }, []);

  // Fetch addresses from the database
  const fetchAddresses = (uid) => {
    const addressesRef = ref(db, `Users/${uid}/addresses`);
    onValue(addressesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const addressesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setAddresses(addressesList);
      } else {
        setAddresses([]);
      }
    });
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleAddAddress = () => {
    if (
      newAddress.fullName &&
      newAddress.mobile &&
      newAddress.flatHouse &&
      newAddress.areaColony &&
      newAddress.townCity &&
      newAddress.pinCode
    ) {
      const addressesRef = ref(db, `Users/${user.uid}/addresses`);
      if (isEditing && editAddressId !== null) {
        const addressRef = ref(db, `Users/${user.uid}/addresses/${editAddressId}`);
        update(addressRef, newAddress);
        setIsEditing(false);
        setEditAddressId(null);
      } else {
        const newAddressRef = push(addressesRef); // Generate a new unique key for the address
        set(newAddressRef, newAddress);
      }
      setNewAddress({
        fullName: '',
        mobile: '',
        flatHouse: '',
        areaColony: '',
        townCity: '',
        pinCode: ''
      });
      setShowAddressForm(false);
    }
  };

  const handleEditAddress = (id) => {
    const addressToEdit = addresses.find((addr) => addr.id === id);
    if (addressToEdit) {
      setNewAddress(addressToEdit);
      setIsEditing(true);
      setEditAddressId(id);
      setShowAddressForm(true);
      setActiveTab('address');
    }
  };

  const handleGoToConfirmOrder = () => {
    navigate('/pay'); // Navigate to the confirm order page
  };

  const resetForm = () => {
    setNewAddress({
      fullName: '',
      mobile: '',
      flatHouse: '',
      areaColony: '',
      townCity: '',
      pinCode: ''
    });
    setIsEditing(false);
    setEditAddressId(null);
    setShowAddressForm(false);
  };

  return (
    <div className="address-book">
      <div className="tab-bar">
        <button className={`tab ${activeTab === 'address' ? 'active' : ''}`} onClick={() => handleTabChange('address')}>
          Address
        </button>
      </div>

      {activeTab === 'address' && (
        <div>
          {addresses.length > 0 ? (
            <div>
              {addresses.map((addr) => (
                <div key={addr.id} className="address-card">
                  <p><strong>{addr.fullName}</strong></p>
                  <p>{addr.flatHouse}, {addr.areaColony}</p>
                  <p>{addr.townCity}</p>
                  <p>Pin Code: {addr.pinCode}</p>
                  <p>Mobile: {addr.mobile}</p>
                  <button className="edit-btn" onClick={() => handleEditAddress(addr.id)}>Edit Address</button>
                  <button className="go-to-confirm-order-btn" onClick={handleGoToConfirmOrder}>Confirm Order</button>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <button className="add-address-btn" onClick={() => setShowAddressForm(true)}>+ Add New Address</button>
            </div>
          )}

          {showAddressForm && (
            <div className="address-form">
              <h3>{isEditing ? 'Edit Address' : 'Add New Address'}</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Mobile No.</label>
                <input
                  type="text"
                  value={newAddress.mobile}
                  onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Flat, House No., Building</label>
                <input
                  type="text"
                  value={newAddress.flatHouse}
                  onChange={(e) => setNewAddress({ ...newAddress, flatHouse: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Area, Colony, Street</label>
                <input
                  type="text"
                  value={newAddress.areaColony}
                  onChange={(e) => setNewAddress({ ...newAddress, areaColony: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Town/City</label>
                <input
                  type="text"
                  value={newAddress.townCity}
                  onChange={(e) => setNewAddress({ ...newAddress, townCity: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Pin Code</label>
                <input
                  type="text"
                  value={newAddress.pinCode}
                  onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })}
                />
              </div>
              <div className="form-buttons">
                <button className="save-btn" onClick={handleAddAddress}>
                  {isEditing ? 'Save Changes' : 'Save'}
                </button>
                <button className="cancel-btn" onClick={resetForm}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Address;
