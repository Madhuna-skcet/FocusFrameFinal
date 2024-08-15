import React from 'react';
import { motion } from 'framer-motion';
import './Banner.css';
import bannerVideo from '../assets/glassvideo.mp4';
import { useNavigate } from 'react-router-dom'; 

const Banner = () => {
  const navigate = useNavigate();

  const handleStartShopping = () => {
    navigate('/explore');
  };
  const handleCategory = () => {
    navigate('/category1');
  };

  return (
    <div className="banner-container">
      <div className="banner-content">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="banner-title"
        >
          Glasses & Lens
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="banner-subtitle"
        >
          Elevate Your Look:
          <br />
          Explore Our Exclusive Collection of Over 100 Stunning Sunglasses
        </motion.p>
        <div className="banner-buttons">
          <motion.button
            className="banner-button primary"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleStartShopping}
          >
            Start Shopping
          </motion.button>
          <motion.button  
            className="banner-button secondary"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleCategory}
          >
            Find Out More ➔
          </motion.button>
        </div>
      </div>
      <div className="banner-video-container">
        <video className="banner-video" autoPlay loop muted>
          <source src={bannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Banner;
