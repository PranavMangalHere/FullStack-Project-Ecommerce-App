/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative flex flex-col sm:flex-row min-h-[600px] bg-gray-50 overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 px-6 z-10">
        <div className="text-[#414141] max-w-lg space-y-6">
          <div className="flex items-center gap-4">
            <span className="w-12 h-[2px] bg-[#414141]"></span>
            <span className="font-medium text-sm uppercase tracking-wider">
              Our Bestsellers
            </span>
          </div>

          <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900">
            Latest Arrivals
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            Discover our newest collection of premium fashion pieces designed to
            elevate your style.
          </p>

          <div className="flex space-x-4 items-center">
            <button
              className="px-8 py-3 bg-zinc-600 text-white rounded-full uppercase tracking-wider 
              hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Shop Now
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">New Arrivals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-l from-gray-100 to-transparent opacity-50"></div>
        <img
          className="w-full h-full object-cover rounded-l-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
          src={assets.hero_img}
          alt="Latest Arrivals"
        />
        <div className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Free Shipping
              </p>
              <p className="text-xs text-gray-500">On orders over 2000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
