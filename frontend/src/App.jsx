/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Collection from "./pages/collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SigninSignUp from "./components/SigninSIgnUp";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gray-200">
      {" "}
      {loading && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          {" "}
          <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full flex items-center justify-center">
            <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 backdrop-blur-md"></div>
          </div>
          <span className="text-white ml-4">LOADING...</span>
        </div>
      )}
      {!loading && (
        <>
          <Navbar />
          <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/signin-signup" element={<SigninSignUp />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
