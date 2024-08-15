/* import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import { useNavigate } from 'react-router-dom';
const ProductList = [
  { 
    id: 3, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c2-eyeglasses_img_3519_14_03_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c2-eyeglasses_img_3518_14_03_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-screen-glasses:-silver-black-red-full-rim-geometric-lenskart-blu-blu-computer-glasses-c2-eyeglasses_16_april_m_f406821_24_04_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-screen-glasses:-silver-black-red-full-rim-geometric-lenskart-blu-blu-computer-glasses-c2-eyeglasses_16_april_m_f407245_24_04_2024.jpg'
    ],
    name: 'Ray-Ban Wayfarer', 
    price: 500, 
    originalPrice: 600, 
    rating: 4.5, 
    category: 'Sunglasses'
  },
  { 
    id: 2, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_g_3502_10_14_22.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_g_3501_10_14_22.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_4_nov_2022_m_f_shoot172638_07_11_2022.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_4_nov_2022_m_f_shoot171281_201630_07_11_2022.jpg'
    ], 
    name: 'Oakley Holbrook', 
    price: 600, 
    originalPrice: 700, 
    rating: 4.2, 
    category: 'Sunglasses'
  },
  { 
    id: 3, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-blue-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c3-eyeglasses_img_1410_05_02_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-blue-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c3-eyeglasses_img_1408_05_02_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-phone--computer-glasses-transparent-blue-silver-full-rim-hexagonal-lenskart-air-essentials-la-e13519-c3_13_sep_m-f329003_146020_22_09_2023.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-phone--computer-glasses-transparent-blue-silver-full-rim-hexagonal-lenskart-air-essentials-la-e13519-c3_13_sep_m-f328658_146020_22_09_2023.jpg'
    ], 
    name: 'Warby Parker Beacon', 
    price: 700, 
    originalPrice: 800, 
    rating: 4.7, 
    category: 'Eyeglasses'
  },
  { 
    id: 4, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/black-gold-full-rim-rectangle-john-jacobs-jj-rhapsody-jj-e15370-c1-eyeglasses_g_3085_02_15_23.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/black-gold-full-rim-rectangle-john-jacobs-jj-rhapsody-jj-e15370-c1-eyeglasses_g_3084_02_15_23.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/j/i/black-gold-full-rim-rectangle-john-jacobs-jj-rhapsody-jj-e15370-c1-eyeglasses_10_feb_jj_shoot_jazz_m.f210339_206363_17_feb23.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/j/i/black-gold-full-rim-rectangle-john-jacobs-jj-rhapsody-jj-e15370-c1-eyeglasses_10_feb_jj_shoot_jazz_m.f210664_206363_16_feb2023.jpg'
    ], 
    name: 'Warby Parker Beacon', 
    price: 700, 
    originalPrice: 800, 
    rating: 4.7, 
    category: 'Eyeglasses'
  },
  { 
    id: 5, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c4-eyeglasses_g_3919.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c4-eyeglasses_g_3918.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-phone--computer-glasses-grey-transparent-silver-full-rim-hexagonal-lenskart-air-essentials-la-e13519-c4_13_sep_m-f329010_146021_22_09_2023.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-phone--computer-glasses-grey-transparent-silver-full-rim-hexagonal-lenskart-air-essentials-la-e13519-c4_13_sep_m-f328674_146021_22_09_2023.jpg'
    ], 
    name: 'Warby Parker Beacon', 
    price: 700, 
    originalPrice: 800, 
    rating: 4.7, 
    category: 'Eyeglasses'
  },
  { 
    id: 6, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e13451-c4-eyeglasses_csvfile-1689852651546-g_5496.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e13451-c4-eyeglasses_csvfile-1689852567047-g_5495.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/v/i/pink-transparent-gunmetal-full-rim-geometric-vincent-chase-classic-acetate-vc-e13451-c4-eyeglasses_17_aug_m_f313474_209229_21_08_2023.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/v/i/pink-transparent-gunmetal-full-rim-geometric-vincent-chase-classic-acetate-vc-e13451-c4-eyeglasses_17_aug_m_f313750_209229_21_08_2023.jpg'
    ], 
    name: 'Warby Parker Beacon', 
    price: 700, 
    originalPrice: 800, 
    rating: 4.7, 
    category: 'Eyeglasses'
  },
  { 
    id: 7, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/Vincent-Chase-VC-S14459-C2-Sunglasses_G_6921.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-blue-silver-full-rim-square-lenskart-air-air-essentials-la-e13519-c3-eyeglasses_img_1408_05_02_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/v/i/tortoise-full-rim-wayfarer-vincent-chase-athleisure-vc-s14459-c2-polarized-sunglasses_22_march_m_f_shoot233889_151055_24_march2023.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/v/i/tortoise-full-rim-wayfarer-vincent-chase-athleisure-vc-s14459-c2-polarized-sunglasses_22_march_m_f_shoot233679_151055_24_march2023.jpg'
    ], 
    name: 'Warby Parker Beacon', 
    price: 700, 
    originalPrice: 800, 
    rating: 4.7, 
    category: 'Eyeglasses'
  },
  { 
    id: 8, 
    images: [
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c2-eyeglasses_img_3519_14_03_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-blu-lb-e16383-c2-eyeglasses_img_3518_14_03_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-screen-glasses:-silver-black-red-full-rim-geometric-lenskart-blu-blu-computer-glasses-c2-eyeglasses_16_april_m_f406821_24_04_2024.jpg',
      'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//model/l/i/blue-block-screen-glasses:-silver-black-red-full-rim-geometric-lenskart-blu-blu-computer-glasses-c2-eyeglasses_16_april_m_f407245_24_04_2024.jpg'
    ],
    name: 'Ray-Ban Wayfarer', 
    price: 500, 
    originalPrice: 600, 
    rating: 4.5, 
    category: 'Sunglasses'
  },
  // other products with images
];

const bannerproduct = () => {
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();

  const handleAddToCart = (product) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
  };

  const handleAddToWishlist = (product) => {
    wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const { id } = useParams();
  const product = ProductList.find(p => p.id === parseInt(id, 10));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-wrapper">
      <div className="product-content">
        <div className="product-image-gallery">
          <button className="arrow-button left-arrow" onClick={handlePrevImage}>
            &#9664;
          </button>
          <img 
            src={product.images[currentImageIndex]} 
            alt={`${product.name} ${currentImageIndex + 1}`} 
            className="product-image" 
          />
          <button className="arrow-button right-arrow" onClick={handleNextImage}>
            &#9654;
          </button>
        </div>
        <div className="product-details-container">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-rating">
            <span className="rating-star">&#9733;</span> {product.rating}
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-info">
            <p><strong>Category:</strong> {product.category}</p>
          </div>
          <div className="product-price">
            <p className="price">₹{product.price}</p>
            <p className="original-price">₹{product.originalPrice}</p>
          </div>
          <div className="product-buttons">
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            <button className="wishlist-button" onClick={() => handleAddToWishlist(product)}>
              <i className="fas fa-heart"></i> Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default bannerproduct; */