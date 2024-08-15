 import React from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useCart } from '../Context/CartContext';
  import { useWishlist } from '../Context/WishlistContext';
  import { ref, set } from "firebase/database";
  import { auth, db } from "../Firebase"; // Ensure this path is correct
  import './ProductList.css';
  
  const ProductList = [
    // Your existing product list
    { id: 1, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c2-eyeglasses_img_3519_14_03_2024.jpg', name: 'Ray-Ban Wayfarer', price: 500, originalPrice: 600, rating: 4.5, category: 'Sunglasses' },
    { id: 2, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_g_3502_10_14_22.jpg', name: 'Oakley Holbrook', price: 600, originalPrice: 700, rating: 4.2, category: 'Sunglasses' },
    { id: 3, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-blue-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c3-eyeglasses_img_1410_05_02_2024.jpg', name: 'Warby Parker Beacon', price: 700, originalPrice: 800, rating: 4.7, category: 'Eyeglasses' },
    { id: 4, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/black-gold-full-rim-rectangle-john-jacobs-jj-rhapsody-jj-e15370-c1-eyeglasses_g_3085_02_15_23.jpg', name: 'Persol PO0714', price: 800, originalPrice: 900, rating: 4.6, category: 'Eyeglasses' },
    { id: 5, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c4-eyeglasses_g_3919.jpg', name: 'Gucci GG0061S', price: 900, originalPrice: 1000, rating: 4.8, category: 'Sunglasses' },
    { id: 6, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e13451-c4-eyeglasses_csvfile-1689852651546-g_5496.jpg', name: 'Prada PR 16MV', price: 1000, originalPrice: 1200, rating: 4.4, category: 'Eyeglasses' },
    { id: 7, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/Vincent-Chase-VC-S14459-C2-Sunglasses_G_6921.jpg', name: 'Maui Jim Red Sands', price: 1100, originalPrice: 1300, rating: 4.9, category: 'Sunglasses' },
    { id: 8, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c2-eyeglasses_img_3519_14_03_2024.jpg', name: 'Ray-Ban Wayfarer', price: 500, originalPrice: 600, rating: 4.5, category: 'Sunglasses' },
  ];
  
  const Cart = () => {
    const navigate = useNavigate();
    const { dispatch: cartDispatch } = useCart();
    const { dispatch: wishlistDispatch } = useWishlist();
  
    const handleProductClick = (id) => {
      navigate(`/product/${id}`);
    };
  
    const handleAddToCart = (item) => {
      // Dispatch the action to add the item to the cart
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
      <div className="cart-grid">
        {ProductList.map(item => (
          <div key={item.id} className="cart-box">
            <img src={item.image} alt={item.name} className="cart-image" onClick={() => handleProductClick(item.id)} />
            <div className="cart-details">
              <h3 className="cart-name">{item.name}</h3>
              <div className="cart-rating">
                <span className="cart-rating-star">&#9733;</span> {item.rating}
              </div>
              <p className="cart-price">₹{item.price}</p>
              <p className="cart-original-price">₹{item.originalPrice}</p>
              <p className="cart-category">{item.category}</p>
              <div className="cart-buttons">
                <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
                  <i className="fas fa-plus"></i> Add to Cart
                </button>
                <button className="wishlist-button" onClick={() => handleAddToWishlist(item)}>
                  <i className="fas fa-heart"></i> Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Cart;
  