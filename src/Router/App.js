import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../HomeComponents/Home';
import Signup from '../Login,Signup/SignupForm';
import Login from '../Login,Signup/LoginForm';
import Pcart from '../Pages/PCart';
import Explore from '../ExploreComp/Explore';
import Category from '../HomeComponents/CategoryList';
import Category1 from '../HomeComponents/CategoryList1';
import Profile from '../AddressComp/Addressbar';
import Product from '../InsideProducts/Product';
import Wishproduct from '../WishList/InW';
import Orders from '../Order/OrderSummary';
import { CartProvider } from '../Context/CartContext'; 
import { WishlistProvider } from '../Context/WishlistContext';
import MainLog from '../Login,Signup/LoginPage';
import Sform from '../Seller/ProductForm';
import Vision from '../Category/VisionProductList';
import Contact from '../Category/ContactLensList';
import Glass from '../Category/SunglassesCart';
import Frame from '../Category/FrameList';
import Shome from '../Seller/SellerHome';
import Address from '../AddressComp/Address';
import Payment from '../Order/PaymentPage';
import Confirm from '../Order/OrderConfirmation';
import OrderHistory from '../Order/OrderHistory';
import Seller from '../Seller/Seller';
import Sbank from '../BankDetails/Bank';
import Pikup from '../Pickup/PickupDetails';
import Oval from '../ExploreComp/ProductList';
import Square  from '../Category/FrameList';
import Guide from '../Guide/LensGuide';
const App = () => {
  return (
    
     <WishlistProvider>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainlog" element={<MainLog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sform" element={<Sform />} />
        <Route path="/shome" element={<Shome />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/pcart" element={<Pcart />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category1" element={<Category1 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/wishproduct" element={<Wishproduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/Round" element={<Vision />} />
        <Route path="/Oval" element={<Oval />} />
         <Route path="/Square" element={<Square />} />
         <Route path="/Diamond" element={<Square />} />
        <Route path="/Sun-Glasses" element={<Glass/>} />
        <Route path="/Sunglasses" element={<Glass/>} />
        <Route path="/Heart" element={<Glass/>} />
        <Route path="/guide" element={<Guide/>} />
        <Route path="/frames" element={<Frame />} />
        <Route path="/contact-lenses" element={<Contact/>} />
        <Route path="/address" element={<Address/>} />
        <Route path="/pay" element={<Payment/>} />
        <Route path="/confirmorder" element={<Confirm/>} />
        <Route path="/history" element={<OrderHistory/>} />
        <Route path="/sl" element={<Seller/>} />
        <Route path="/sdashboard" element={<Shome/>} />
        <Route path="/sbank" element={<Sbank/>} />
        <Route path="/pick" element={<Pikup/>} />
      
      </Routes>
    </Router>
    </CartProvider>
    </WishlistProvider>
  );
};

export default App;
