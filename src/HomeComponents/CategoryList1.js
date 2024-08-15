import React from 'react';
import { motion } from 'framer-motion';
import './CategoryList1.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Vision', image: 'https://i.pinimg.com/564x/7c/df/a6/7cdfa6d5e7bfeffefac8bb55429364c4.jpg' },
  { id: 2, name: 'Sun-Glasses', image: 'https://i.pinimg.com/564x/27/72/ea/2772ea150ced4238090e509193a99f06.jpg' },
  { id: 3, name: 'Contact-Lenses', image: 'https://i.pinimg.com/564x/1c/36/eb/1c36ebe730d8cd5e74980ef13eed03f2.jpg' },
  { id: 4, name: 'Frames', image: 'https://i.pinimg.com/564x/ca/27/bc/ca27bc9f8820c61f4c557f624d39562e.jpg' },
];

const CategoryList1 = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="category-container1">
      <Navbar />
      <motion.h2 
        className="category-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Categories
      </motion.h2>
      <div className="category-list">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="category-box"
            onClick={() => handleCategoryClick(category.name)}
            whileHover={{ scale: 1.05, boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)' }}
            transition={{ duration: 0.3 }}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-info">
              <h3 className="category-name">{category.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList1;
