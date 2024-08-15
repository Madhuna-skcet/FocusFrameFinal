import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './visionProductList.css';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import { ref, set } from "firebase/database";
import { auth, db } from "../Firebase";

const visionProductList = [
  // Your product list here...
  { id: 17, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/pink-gold-pink-full-rim-cat-eye-john-jacobs-tr-flex-jj-e-14409-c6-eyeglasses__dsc5657.jpg', name: 'Crystal Clear Vision', price: 500, originalPrice: 600, rating: 4.5, category: 'Prescription Glasses' },
  { id: 18, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_g_3502_10_14_22.jpg', name: 'Sun Shield Pro', price: 600, originalPrice: 700, rating: 4.2, category: 'Sunglasses' },
  { id: 19, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-jj-e10235-c7-eyeglasses_g_2375_image_pla.jpg', name: 'Ultra Vision HD', price: 700, originalPrice: 800, rating: 4.7, category: 'Contact Lenses' },
  { id: 20, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-jj-e13346-c2-eyeglasses_g_5794.jpg', name: 'Eagle Eye Elite', price: 800, originalPrice: 900, rating: 4.6, category: 'Prescription Glasses' },
  { id: 21, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-gold-full-rim-rectangle-lenskart-air-essentials-la-e13517-c2-eyeglasses_csvfile-1695816787888-g_7549_0_image_pla.jpg', name: 'Polarized Vision', price: 900, originalPrice: 1000, rating: 4.8, category: 'Sunglasses' },
  { id: 22, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-blue-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c3-eyeglasses_img_1410_05_02_2024.jpg', name: 'Clarity Pro', price: 1000, originalPrice: 1200, rating: 4.4, category: 'Prescription Glasses' },
  { id: 23, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-jj-e13346-c2-eyeglasses_g_5794.jpg', name: 'HD Vision Master', price: 1100, originalPrice: 1300, rating: 4.9, category: 'Contact Lenses' },
];

const VisionCart = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); 
  };

  const handleAddToCart = (item) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });

    auth.onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid;
        const cartItemRef = ref(db, `Users/${userId}/cart/${item.id}`);
        set(cartItemRef, {
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          userName: user.displayName || user.email.split('@')[0],
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

  const filteredProducts = visionProductList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="vision-cart-container">
      {/* Search Input */}
      <div className="vision-search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="vision-cart-grid">
        {filteredProducts.map(item => (
          <div key={item.id} className="vision-cart-box">
            <img
              src={item.image}
              alt={item.name}
              className="vision-cart-image"
              onClick={() => handleProductClick(item.id)}
            />
            <div className="vision-cart-details">
              <h3 className="vision-cart-name">{item.name}</h3>
              <div className="vision-cart-rating">
                <span className="vision-cart-rating-star">&#9733;</span> {item.rating}
              </div>
              <p className="vision-cart-price">₹{item.price}</p>
              <p className="vision-cart-original-price">₹{item.originalPrice}</p>
              <p className="vision-cart-category">{item.category}</p>
              <div className="vision-cart-buttons">
                <button
                  className="vision-add-to-cart-button"
                  onClick={() => handleAddToCart(item)}
                >
                  <i className="fas fa-plus"></i> Add to Cart
                </button>
                <button
                  className="vision-wishlist-button"
                  onClick={() => handleAddToWishlist(item)}
                >
                  <i className="fas fa-heart"></i> Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionCart;
