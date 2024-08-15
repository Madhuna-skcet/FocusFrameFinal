import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SunglassesList.css';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import Navbar from '../HomeComponents/Navbar';
import { ref, set } from "firebase/database";
import { auth, db } from "../Firebase";
const SunglassesList = [
  { id: 24, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/Vincent-Chase-VC-S14459-C2-Sunglasses_G_6921.jpg', name: 'Polarized Shades', price: 1500, originalPrice: 1600, rating: 4.5, category: 'Polarized' },
  { id: 25, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/tortoise-blue-full-rim-wayfarer-vincent-chase-classics-vc-s16747-c1-polarized-sunglasses_img_5848_04_03_2024.jpg', name: 'Wayfarer Sunglasses', price: 2000, originalPrice: 2100, rating: 4.4, category: 'Wayfarer' },
  { id: 26, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/Silver-Maroon-Full-Rim-Geometric-Vincent-Chase-LIVEWIRE-VC-S14506-C5-Polarized-Sunglasses_G_7230.jpg', name: 'Aviator Sunglasses', price: 1700, originalPrice: 1800, rating: 4.7, category: 'Aviator' },
  { id: 27, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/silver-blue-full-rim-square-john-jacobs-jj-tints-jj-s12503-c2-polarized-sunglasses_john-jacobs-full-rim-aviator-jj-s12503-c2-sunglasses_sunglasses_g_1936_1_1_05_july23.jpg', name: 'Sporty Sunglasses', price: 1600, originalPrice: 1700, rating: 4.2, category: 'Sporty' },
  { id: 28, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-brown-full-rim-cat-eye-vincent-chase-polarized-polarized-the-metal-edit-vc-s11470-c5-sunglasses_vincent-chase-vc-s11470-c5-sunglasses_sunglasses_g_2463_1_28july23.jpg', name: 'Retro Sunglasses', price: 1800, originalPrice: 1900, rating: 4.6, category: 'Retro' },
  { id: 29, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s16558-c2-sunglasses_img_9684_29_dec23.jpg', name: 'Cat Eye Sunglasses', price: 1900, originalPrice: 2000, rating: 4.8, category: 'Cat Eye' },
  { id: 30, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-the-metal-edit-vc-s15765-c1-sunglasses_img_4727_24_01_2024.jpg', name: 'Round Sunglasses', price: 2100, originalPrice: 2200, rating: 4.9, category: 'Round' },
  { id: 31, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/pink-silver-rimless-round-vincent-chase-fashion-essentials-vc-s16543-c2-sunglasses_img_0687_24_01_2024.jpg', name: 'Oversized Sunglasses', price: 2200, originalPrice: 2300, rating: 4.9, category: 'Oversized' },
];

const SunglassesCart = () => {
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
    <div className="sunglasses-grid">
    <Navbar/>
      {SunglassesList.map(item => (
        <div key={item.id} className="sunglasses-box">
          <img src={item.image} alt={item.name} className="sunglasses-image" onClick={() => handleProductClick(item.id)} />
          <div className="sunglasses-details">
            <h3 className="sunglasses-name">{item.name}</h3>
            <div className="sunglasses-rating">
              <span className="sunglasses-rating-star">&#9733;</span> {item.rating}
            </div>
            <p className="sunglasses-price">₹{item.price}</p>
            <p className="sunglasses-original-price">₹{item.originalPrice}</p>
            <p className="sunglasses-category">{item.category}</p>
            <div className="sunglasses-buttons">
              <button className="sunglasses-add-to-cart-button" onClick={() => handleAddToCart(item)}>
                <i className="fas fa-plus"></i> Add to Cart
              </button>
              <button className="sunglasses-wishlist-button" onClick={() => handleAddToWishlist(item)}>
                <i className="fas fa-heart"></i> Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SunglassesCart;
