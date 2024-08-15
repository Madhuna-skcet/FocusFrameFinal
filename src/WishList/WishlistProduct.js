import React from 'react';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import './WishlistProduct.css';

const WishlistProduct = () => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleAddToBag = (item) => {
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: item });
    cartDispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return (
    <div className="wishlist-container">
      {wishlistState.wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <img
            src="https://eyesome.netlify.app/static/media/empty-wish.5af0d55ffd0f31b86c32.gif"
            alt="Empty Wishlist"
            className="empty-image"
          />
          <p>Nothing to Show!</p>
          <p>Unlock Your Shopping Desires: Fill Your Empty Wishlist</p>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlistState.wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              className="wishlist-item"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="product-image"
              />
              <div className="item-details">
                <h3 className="product-name">{item.name}</h3>
                <p className="rating">
                  <FaStar className="star" /> {item.rating}
                </p>
                <p className="price">₹{item.price}</p>
                <p className="original-price">₹{item.originalPrice}</p>
                <p className="brand">{item.brand}</p>
                <button
                  onClick={() => handleAddToBag(item)}
                  className="add-to-bag"
                >
                  Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistProduct;
