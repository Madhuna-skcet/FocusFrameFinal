import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../Context/CartContext'; // Import the useCart hook
import { useWishlist } from '../Context/WishlistContext';
const Navbar = () => {
  const navigate = useNavigate();
  const { state: cartState } = useCart(); // Get the state from the context
  const { state: wishlistState } = useWishlist();
  const handleProfileClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/mainlog'); // Navigate to login page
  };

  const Next = () => {
    navigate('/explore');
  };

  const Next1 = () => {
    navigate('/profile');
  };

  const Next2 = () => {
    navigate('/pcart');
  };

  const Next3 = () => {
    navigate('/wishproduct');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-icon-button">
          <motion.img 
            src="https://i.pinimg.com/564x/a0/c4/ee/a0c4ee77b193a26a994f7bec5f8fcdb0.jpg" 
            alt="Wishlist" 
            className="navbar-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={Next1}
          />
        </div>
        <motion.button
          className="navbar-profile"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleProfileClick}
        >
          <div className="navbar-profile-name">
            FocusFrame
          </div>
        </motion.button>
        <motion.button
          className="navbar-login"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLoginClick}
        >
          Login
        </motion.button>
      </div>
      <div className="navbar-center">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search Glasses"
            className="navbar-search-input"
          />
          <div className="navbar-search-icon">
            {/* Add your search icon here */}
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <motion.button 
          className="navbar-explore-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={Next}
        >
          Explore
        </motion.button>
        <div className="navbar-icon-button">
          <motion.img 
            src="https://media.istockphoto.com/id/1410655294/vector/wishlist-icon-in-flat-style-love-letter-like-document-vector-illustration-on-white-isolated.jpg?s=612x612&w=0&k=20&c=IqjzBiHAb3pFcx6peDqHFbN5M9Dr4MmapyjZzVLgdZQ=" 
            alt="Wishlist" 
            className="navbar-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={Next3}
          />
           <div className="wishlist-count">{wishlistState.wishlistCount}</div>        </div>
        <div className="navbar-icon-button">
          <motion.img 
            src="https://i.pinimg.com/736x/c1/83/57/c1835753ac24875cac9123b326fce1cb.jpg" 
            alt="Cart" 
            className="navbar-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={Next2}
          />
          <div className="cart-count">{cartState.cartCount}</div> {/* Display cart count */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;