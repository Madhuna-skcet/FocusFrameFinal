import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import { ref, set } from "firebase/database";
import { auth, db } from "../Firebase";
import './Cart.css';

const ProductList = [
  { id: 9, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/tortoise-blue-full-rim-wayfarer-vincent-chase-classics-vc-s16747-c1-polarized-sunglasses_img_5848_04_03_2024.jpg', name: 'Ray-Ban Wayfarer', price: 500, originalPrice: 600, rating: 4.5, category: 'Sunglasses' },
  { id: 10, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/transparent-grey-full-rim-sports-vincent-chase-athleisure-vc-s14122-c7-polarized-sunglasses_g_2891_24_07_2022.jpg', name: 'Warby Parker Beacon', price: 700, originalPrice: 800, rating: 4.7, category: 'Eyeglasses' },
  { id: 11, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-brown-pink-gradient-full-rim-round-vincent-chase-polarized-the-metal-edit-vc-s14084-c4-polarized-sunglasses_vincent-chase-vc-s14084-c4-c4-sunglasses_vincent-chase-vc-s14084-c4-c4-sunglasses_vincent-chase-vc-s14084-c4-c4-sunglasses_g_6511_5july23.jpg', name: 'Oakley Holbrook', price: 600, originalPrice: 700, rating: 4.2, category: 'Sunglasses' },
  { id: 12, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//o/i/gold-black-pink-rimless-geometric-ojos-oj-s15229-c2-sunglasses_g_8345_8_30_22.jpg', name: 'Persol PO0714', price: 800, originalPrice: 900, rating: 4.6, category: 'Eyeglasses' },
  { id: 13, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-black-grey-gradient-full-rim-cat-eye-vincent-chase-polarized-vintage-vc-s11759-c3-sunglasses_g_4992_6_07_22.jpg', name: 'Gucci GG0061S', price: 900, originalPrice: 1000, rating: 4.8, category: 'Sunglasses' },
  { id: 14, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/pink-black-full-rim-wayfarer-vincent-chase-indoor-glasses-vc-s17421-c1-sunglasses__dsc2123_07_08_2024.jpg', name: 'Prada PR 16MV', price: 1000, originalPrice: 1200, rating: 4.4, category: 'Eyeglasses' },
  { id: 15, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/black-gunmetal-grey-solid-full-rim-clubmaster-john-jacobs-jj-tints-jj-s13089-c1-sunglasses_g_8903_10_05_2023.jpg', name: 'Maui Jim Black Sands', price: 1100, originalPrice: 1300, rating: 4.9, category: 'Sunglasses' },
  { id: 16, image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/blue-gradient-blue-transparent-full-rim-wayfarer-vincent-chase-indoor-glasses-vc-s17431-c2-sunglasses__dsc2182_07_08_2024.jpg', name: 'Maui Jim Blue Sands', price: 1100, originalPrice: 1300, rating: 4.9, category: 'Sunglasses' },
];

const Cart = () => {
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (item) => {
    if (!user) {
      alert('Please log in to continue');
      return;
    }

    cartDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });

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
  };

  const handleAddToWishlist = (item) => {
    if (!user) {
      alert('Please log in to continue');
      return;
    }
    wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  return (
    <div className="cart-outer-container">
      <h1 className="head">Trending Products</h1>
      <div className="cart-container">
        <div className="cart-grid">
          {ProductList.map(item => (
            <div key={item.id} className="cart-box">
              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
                onClick={() => handleProductClick(item.id)}
              />
              <div className="cart-details">
                <h3 className="cart-name">{item.name}</h3>
                <div className="cart-rating">
                  <span className="cart-rating-star">&#9733;</span> {item.rating}
                </div>
                <p className="cart-price">₹{item.price}</p>
                <p className="cart-original-price">₹{item.originalPrice}</p>
                <p className="cart-category">{item.category}</p>
                <div className="cart-buttons">
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(item)}
                  >
                    <i className="fas fa-plus"></i> +
                  </button>
                  <button
                    className="wishlist-button"
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
    </div>
  );
};

export default Cart;
