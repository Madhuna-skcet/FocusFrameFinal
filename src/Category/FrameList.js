import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FrameList.css';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import Navbar from '../HomeComponents/Navbar';
import { ref, set } from "firebase/database";
import { auth, db } from "../Firebase";
const FrameList = [
  { id: 32, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-jj-e10235-c7-eyeglasses_g_2374.jpg', name: 'Classic Frame', price: 1500, originalPrice: 1800, rating: 4.5, category: 'Full Rim' },
  { id: 33, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/sky-blue-full-rim-square-lenskart-air-fusion-la-e13069-c2-eyeglasses_lenskart-air-la-e13033-c2-eyeglasses_eyeglasses_g_3587_2_05_july23.jpg', name: 'Modern Frame', price: 1700, originalPrice: 2000, rating: 4.7, category: 'Half Rim' },
  { id: 34, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/pink-transparent-full-rim-round-john-jacobs-rich-acetate-jj-e11515-c10-eyeglasses_img_7158_24_02_2024.jpg', name: 'SunShield Frame', price: 1600, originalPrice: 1900, rating: 4.2, category: 'Sunglasses' },
  { id: 35, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/Black-Grey-Full-Rim-Wayfarer-Lenskart-Air-Classic-LA-E12489-C6-Eyeglasses_lenskart-air-la-e12489-c6-eyeglasses_G_721007_02_2022.jpg', name: 'Comfort Frame', price: 1800, originalPrice: 2100, rating: 4.6, category: 'Full Rim' },
  { id: 36, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e13788-c1-eyeglasses_vincent-chase-vc-e13788-c1-eyeglasses_g_3341.jpg', name: 'Polarized Frame', price: 1900, originalPrice: 2200, rating: 4.8, category: 'Sunglasses' },
  { id: 37, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-blue-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c3-eyeglasses_img_1408_05_02_2024.jpg', name: 'Crystal Clear Frame', price: 2000, originalPrice: 2400, rating: 4.4, category: 'Half Rim' },
  { id: 38, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-silver-full-rim-square-lenskart-air-air-essentials-la-e13520-c2-eyeglasses_lenskart-air-la-e13520-c2-eyeglasses_g_3923_1b_28july23.jpg', name: 'UV Protection Frame', price: 2100, originalPrice: 2500, rating: 4.9, category: 'Full Rim' },
  { id: 39, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e14035-c2-eyeglasses_vincent-chase-vc-e14035-c2-eyeglasses_G_6294.jpg', name: 'UV Protection Frame', price: 2100, originalPrice: 2500, rating: 4.9, category: 'Full Rim' },
];

const FrameCart = () => {
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
    <div className="frame-grid">
      <Navbar/>
      {FrameList.map(item => (
        <div key={item.id} className="frame-box">
          <img src={item.image} alt={item.name} className="frame-image" onClick={() => handleProductClick(item.id)} />
          <div className="frame-details">
            <h3 className="frame-name">{item.name}</h3>
            <div className="frame-rating">
              <span className="frame-rating-star">&#9733;</span> {item.rating}
            </div>
            <p className="frame-price">₹{item.price}</p>
            <p className="frame-original-price">₹{item.originalPrice}</p>
            <p className="frame-category">{item.category}</p>
            <div className="frame-buttons">
              <button className="frame-add-to-cart-button" onClick={() => handleAddToCart(item)}>
                <i className="fas fa-plus"></i> Add to Cart
              </button>
              <button className="frame-wishlist-button" onClick={() => handleAddToWishlist(item)}>
                <i className="fas fa-heart"></i> Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrameCart;
