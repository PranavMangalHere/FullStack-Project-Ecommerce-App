import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/Shopcontext";

const Navbar = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { getCartCount } = useContext(ShopContext);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/collection", label: "COLLECTION" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" }
  ];

  const renderNavLink = (path, label) => (
    <NavLink 
      key={path} 
      to={path} 
      className="flex flex-col items-center gap-1 group"
    >
      <p>{label}</p>
      <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
    </NavLink>
  );

  const renderMobileNavLink = (path, label) => (
    <NavLink
      key={`mobile-${path}`}
      onClick={() => setIsMenuVisible(false)}
      className="py-2 pl-6 border-b hover:bg-gray-50 transition-colors"
      to={path}
    >
      {label}
    </NavLink>
  );

  return (
    <div className="flex items-center justify-between py-5 font-medium container mx-auto px-4">
      {/* Logo */}
      <Link to="/">
        <img 
          src={assets.logo} 
          className="w-36 hover:opacity-80 transition-opacity" 
          alt="Logo" 
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map(link => renderNavLink(link.path, link.label))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Profile Icon */}
        <Link to="/SigninSignUp" className="hover:opacity-80 transition-opacity">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
        </Link>

        {/* Cart Icon */}
        <Link to="/cart" className="relative hover:opacity-80 transition-opacity">
          <img 
            src={assets.cart_icon} 
            className="w-5 min-w-5" 
            alt="Cart" 
          />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <img
          onClick={() => setIsMenuVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden hover:opacity-80 transition-opacity"
          alt="Menu"
        />
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuVisible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          {/* Mobile Menu Close Button */}
          <div
            onClick={() => setIsMenuVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>

          {/* Mobile Navigation Links */}
          {navLinks.map(link => renderMobileNavLink(link.path, link.label))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;