import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database'; // Import Firebase functions
import { auth, db } from '../Firebase'; // Import auth and db from Firebase configuration
import './ProductForm.css'; // Import any necessary CSS

const ProductForm = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    productName: '',
    brand: '',
    modelNumber: '',
    frameMaterial: '',
    lensMaterial: '',
    frameColor: '',
    lensColor: '',
    frameSize: '',
    lensSize: '',
    frameShape: '',
    prescriptionType: '',
    price: '',
    discount: '',
    stockQuantity: '',
    warranty: '',
    imageUrl: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (user) {
        const sellerId = user.uid;

        await set(ref(db, `Sellers/${sellerId}/Products/${productData.productName}`), {
          ...productData,
        });

        setShowModal(true);
        setTimeout(() => {
          navigate('/pick');
        }, 2000);
      } else {
        console.error("No seller is logged in.");
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    
    <div className="pf-container">
    <div className="marquee">
        <p>Trusted by sellers worldwide – confidently list your eyewear products on our platform and reach thousands of customers with secure and seamless transactions!</p>
      </div>
      <nav className="pf-navbar">
        <h1> Add New Product</h1>
      </nav>
      <div className="pf-form">
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            required
          />
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            required
          />
          <label htmlFor="modelNumber">Model Number</label>
          <input
            type="text"
            name="modelNumber"
            value={productData.modelNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor="frameMaterial">Frame Material</label>
          <input
            type="text"
            name="frameMaterial"
            value={productData.frameMaterial}
            onChange={handleChange}
            required
          />
          <label htmlFor="lensMaterial">Lens Material</label>
          <input
            type="text"
            name="lensMaterial"
            value={productData.lensMaterial}
            onChange={handleChange}
            required
          />
          <label htmlFor="frameColor">Frame Color</label>
          <input
            type="text"
            name="frameColor"
            value={productData.frameColor}
            onChange={handleChange}
            required
          />
          <label htmlFor="lensColor">Lens Color</label>
          <input
            type="text"
            name="lensColor"
            value={productData.lensColor}
            onChange={handleChange}
            required
          />
          <label htmlFor="frameSize">Frame Size</label>
          <input
            type="text"
            name="frameSize"
            value={productData.frameSize}
            onChange={handleChange}
            required
          />
          <label htmlFor="lensSize">Lens Size</label>
          <input
            type="text"
            name="lensSize"
            value={productData.lensSize}
            onChange={handleChange}
            required
          />
          <label htmlFor="frameShape">Frame Shape</label>
          <input
            type="text"
            name="frameShape"
            value={productData.frameShape}
            onChange={handleChange}
            required
          />
          <label htmlFor="prescriptionType">Prescription Type</label>
          <input
            type="text"
            name="prescriptionType"
            value={productData.prescriptionType}
            onChange={handleChange}
            required
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
          />
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={productData.stockQuantity}
            onChange={handleChange}
            required
          />
          <label htmlFor="warranty">Warranty</label>
          <input
            type="text"
            name="warranty"
            value={productData.warranty}
            onChange={handleChange}
            required
          />
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            required
          />
          <button type="submit" className="pf-submit">Add Product</button>
        </form>
      </div>

      {showModal && (
        <div className="pf-modal-overlay">
          <div className="pf-modal">
            <h3>Your product has been added successfully. We will reach out to you and get the product.</h3>
            <button className="pf-close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
