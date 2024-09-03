import React, { Component } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";
import Order from "./components/Orders";
import Product from "./components/Products";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import AdminLogin from "./components/AdminLogin";
import DocumentPage from "./components/DocumentPage";
import AddProduct from "./components/AddProduct";
import Category from "./components/Category";
import Profile from "./components/Profile.js";

// Layout component to conditionally render Header and Sidebar
const Layout = () => {
  const location = useLocation();

  // Check if the current pathname is not "/admin"
  const shouldShowHeaderAndSidebar = location.pathname !== "/adminlogin";

  return (
      <div>
          {shouldShowHeaderAndSidebar && <Header />}
          {shouldShowHeaderAndSidebar && <SideBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/order" element={<Order />} />
            <Route path="/product" element={<Product />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/docs" element={<DocumentPage />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/category" element={<Category />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </div>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
