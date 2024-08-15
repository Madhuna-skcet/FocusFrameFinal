// Home.js
import React from 'react';
import Banner from './Banner';
import Navbar from './Navbar'; 
import Cart from './Cart';
import Category from './CategoryList';
import F from './Footer';
// Ensure the path is correct
const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Cart />
      <Category/><br/>
      <F/>
   </div>
  );
};
export default Home;
