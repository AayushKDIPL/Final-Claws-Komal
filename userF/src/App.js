import React from 'react';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "react";  

import Cart from './Components/Cart';
import Home from './Components/Home';
import Cards from './Components/Cards.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Tshirt from './Components/Tshirt';
import ArmWrestlingT from './Components/ArmWrestlingT';
// import CupPower from './Components/CupPower';
// import Grips from './Components/Grips';  
import Footer from './Components/Footer';
import Merchandise from './Components/Merchandise';
import Others from './Components/Others';
import Login from './Components/Login';
import Signup from './Components/Signup.jsx';
// import Signup from './Components/Signup.jsx'; 
// import CheckoutPage from './Components/CheckoutPage';
// import OrderHistory from './Components/OrderHistory';
import OrderDetails from './Components/OrderDetails';
import CheckOut from './Components/CheckOut.jsx';
import Check from './Components/Check';
import DeliveryAddressForm from './Components/DeliveryAddressForm';
import Product from './Components/Product.jsx';
import CheckOuts from './Components/CheckoutPage.jsx';
import FilterProduct from './Components/FilterProduct.jsx';
import CartPage from './Components/CartPage.jsx';
import CheckoutPage from './Components/CheckoutPage.jsx';
import OrderPage from './Components/OrderPage.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
import ContactUsPage from './Components/ContactUsPage.jsx';
import ThankYou from './Components/ThankYou.jsx';
import SearchPage from './Components/SearchPage.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import MyCart from './Components/MyCart.jsx';
import { ProductOverviewTwo } from './Components/ProductOverviewTwo.jsx';
import CheckoutTwo from './Components/CheckoutTwo.jsx';
import ProductPage from './Components/ProductPage.jsx';
import FirstOrder from './Components/FirstOrder.jsx';
import FirstOrders from './Components/FirstOrders.jsx';
import FinalProfile from './Components/FinalProfile.jsx';
function App() {

  

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/merchandise/:id" element={<Merchandise />} exact />
        <Route path="/merchandise" element={<Tshirt />} exact /> 
        <Route path="/equipment/ArmWrestlingT" element={<ArmWrestlingT />} exact />
        {/* <Route path="/equipment/euip2" element={<CupPower />} exact /> */}
        {/* <Route path="/equipment/euip3" element={<Grips />} exact /> */}
        <Route path="/equipment" element={<Others />} exact /> 
        <Route path="/login" element={<Login />} exact /> 
        <Route path="/signup" element={<Signup />} exact /> 
        <Route path="/check" element={<Check />} exact /> 
        <Route path="/address" element={<DeliveryAddressForm />} exact /> 
         
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        {/* <Route path="/orderhistory" element={<OrderHistory />} /> */}
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkOut" element={<CheckOut />} />
        <Route path="/filter/:name" element={<FilterProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/orderproceed" element={<CheckOuts />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/thanku" element={<ThankYou />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/over" element={<ProductOverviewTwo />} />
        <Route path="/checktwo" element={<CheckoutTwo />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
        <Route path="/order1" element={<FirstOrder />} />
        <Route path="/order2" element={<FirstOrders />} />
        <Route path="/finalp" element={<FinalProfile />} />
        {/* <Route path="/merchandise/Product_details" element={<Cards />} exact /> */}
 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;