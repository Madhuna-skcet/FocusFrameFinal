import React from 'react';
import { useParams } from 'react-router-dom';
/* import './Product.css'; */

const cartItems = [
  { id: 1, image: 'https://m.media-amazon.com/images/I/41A0jZlgu5L._AC_UY1100_.jpg', name: 'Ray-Ban Wayfarer', price: 500, category: 'Sunglasses' },
  { id: 2, image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/frame/j/d/i/52-na-gold-black-356-poshh-eyewear-original-imagmg6sf2mvmwdu.jpeg?q=90&crop=false', name: 'Oakley Holbrook', price: 600, category: 'Sunglasses' },
  { id: 3, image: 'https://m.media-amazon.com/images/I/61S6aWpXeOL._AC_UY1100_.jpg', name: 'Warby Parker Beacon', price: 700, category: 'Eyeglasses' },
  { id: 4, image: 'https://m.media-amazon.com/images/I/61r8fRpWoFL._AC_UY1100_.jpg', name: 'Persol PO0714', price: 800, category: 'Eyeglasses' },
  { id: 5, image: 'https://m.media-amazon.com/images/I/71reDYxe6BL._AC_SL1500_.jpg', name: 'Gucci GG0061S', price: 900, category: 'Sunglasses' },
  { id: 6, image: 'https://m.media-amazon.com/images/I/71reDYxe6BL._AC_SL1500_.jpg', name: 'Prada PR 16MV', price: 1000, category: 'Eyeglasses' },
  { id: 7, image: 'https://m.media-amazon.com/images/I/71reDYxe6BL._AC_SL1500_.jpg', name: 'Maui Jim Red Sands', price: 1100, category: 'Sunglasses' },
];

const Product = () => {
  const { id } = useParams();
  const product = cartItems.find(item => item.id === parseInt(id, 10));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-wrapper">
      <div className="product-content">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-details-container">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">₹{product.price}</p>
          <p className="product-category">{product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
