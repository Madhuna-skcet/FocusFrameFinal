import React from 'react';
import Navbar from '../HomeComponents/Navbar'; 
import Image from '../ExploreComp/ImageSlider';
import Product from '../ExploreComp/ProductList';
const Explore = () => {
  return (
    <div>
      <Navbar/><br/><br/><br/><br/><br/>
      <Image/>
     <Product/>
   </div>
  );
};
export default Explore;
