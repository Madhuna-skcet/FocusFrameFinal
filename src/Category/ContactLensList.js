// ContactLensList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactLensList.css';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import Navbar from '../HomeComponents/Navbar';
import { ref, set } from "firebase/database";
import { auth, db } from "../Firebase";
const ContactLensList = [
  { id: 40, image: 'https://i.pinimg.com/564x/b4/ae/9b/b4ae9bbdec3a2f630be03aae108e33a3.jpg', name: 'Clear Vision Contact', price: 500, originalPrice: 600, rating: 4.5, category: 'Daily Lenses' },
  { id: 41, image: 'https://i.pinimg.com/564x/2c/e5/5b/2ce55b613163ec1d6da769b63eadfdbf.jpg', name: 'HD Vision Contacts', price: 700, originalPrice: 800, rating: 4.7, category: 'Monthly Lenses' },
  { id: 42, image: 'https://i.pinimg.com/564x/c6/13/ad/c613ad876988228c6a2edf451095aad1.jpg', name: 'SunShield Contacts', price: 600, originalPrice: 700, rating: 4.2, category: 'Sunglasses' },
  { id: 43, image: 'https://i.pinimg.com/564x/4f/2d/b4/4f2db409aaf2ae456b7523628cc84226.jpg', name: 'Comfort Vision Contact', price: 800, originalPrice: 900, rating: 4.6, category: 'Daily Lenses' },
  { id: 44, image: 'https://i.pinimg.com/564x/08/46/39/084639615f01b0bd5dba8b4de167995c.jpg', name: 'Polarized Contacts', price: 900, originalPrice: 1000, rating: 4.8, category: 'Sunglasses' },
  { id: 45, image: 'https://i.pinimg.com/564x/d6/12/f4/d612f46d18cc73d32e8c415f249a108d.jpg', name: 'Crystal Clear Contacts', price: 1000, originalPrice: 1200, rating: 4.4, category: 'Monthly Lenses' },
  { id: 46, image: 'https://i.pinimg.com/564x/79/1c/bd/791cbddf2311486c5090ab4a06175c58.jpg', name: 'UV Protection Contacts', price: 1100, originalPrice: 1300, rating: 4.9, category: 'Daily Lenses' },
  { id: 47, image: 'https://i.pinimg.com/564x/10/84/ff/1084ff134859ba0517b07af74f1e6d3e.jpg', name: 'UV Protection Contacts', price: 1100, originalPrice: 1300, rating: 4.9, category: 'Daily Lenses' },
];

const ContactLensCart = () => {
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();
  
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };
 

  const handleAddToCart = (item) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
 // Add the item to the Firebase Realtime Database
 auth.onAuthStateChanged(user => {
  if (user) {
    const userId = user.uid;
    const cartItemRef = ref(db, `Users/${userId}/cart/${item.id}`);
    set(cartItemRef, {
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      userName: user.displayName || user.email.split('@')[0], // Using username or email prefix as a fallback
    }).then(() => {
      console.log('Cart item added to database');
    }).catch(error => {
      console.error('Error adding cart item to database:', error);
    });
  }
});
};


  const handleAddToWishlist = (item) => {
    wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  return (
    <div className="contact-lens-grid">
    <Navbar/>
      {ContactLensList.map(item => (
        <div key={item.id} className="contact-lens-box">
          <img src={item.image} alt={item.name} className="contact-lens-image" onClick={() => handleProductClick(item.id)} />
          <div className="contact-lens-details">
            <h3 className="contact-lens-name">{item.name}</h3>
            <div className="contact-lens-rating">
              <span className="contact-lens-rating-star">&#9733;</span> {item.rating}
            </div>
            <p className="contact-lens-price">₹{item.price}</p>
            <p className="contact-lens-original-price">₹{item.originalPrice}</p>
            <p className="contact-lens-category">{item.category}</p>
            <div className="contact-lens-buttons">
              <button className="contact-lens-add-to-cart-button" onClick={() => handleAddToCart(item)}>
                <i className="fas fa-plus"></i> Add to Cart
              </button>
              <button className="contact-lens-wishlist-button" onClick={() => handleAddToWishlist(item)}>
                <i className="fas fa-heart"></i> Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactLensCart;
