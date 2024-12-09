/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";
import { CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative flex flex-col sm:flex-row min-h-[600px] bg-gray-50 overflow-hidden">
      {/* Hero Left Side */}
      <div 
        className="w-full sm:w-1/2 flex items-center justify-center py-16 px-6 z-10 
        animate-fade-in-left"
      >
        <div className="text-[#414141] max-w-lg space-y-6">
          {/* Subtitle Section */}
          <div 
            className="flex items-center gap-4 
            opacity-0 animate-delay-200 animate-fade-in-right"
          >
            <span className="w-12 h-[2px] bg-[#414141]"></span>
            <span className="font-medium text-sm uppercase tracking-wider">
              Our Bestsellers
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900 
            opacity-0 animate-delay-400 animate-fade-in-right"
          >
            Latest Arrivals
          </h1>

          {/* Description */}
          <p 
            className="text-gray-600 text-base leading-relaxed 
            opacity-0 animate-delay-600 animate-fade-in-right"
          >
            Discover our newest collection of premium fashion pieces designed to
            elevate your style.
          </p>

          {/* Action Buttons */}
          <div 
            className="flex space-x-4 items-center 
            opacity-0 animate-delay-800 animate-fade-in-right"
          >
            <button
              className="px-8 py-3 bg-zinc-600 text-white rounded-full uppercase tracking-wider 
              hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
              active:scale-95 group"
            >
              <span className="block group-hover:scale-110 transition-transform">
                Shop Now
              </span>
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle 
                className="h-6 w-6 text-green-500 animate-pulse" 
                strokeWidth={2} 
              />
              <span className="text-sm">New Arrivals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div 
        className="w-full sm:w-1/2 relative flex items-center justify-center 
        animate-fade-in-right"
      >
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-l from-gray-100 to-transparent 
          opacity-50 animate-pulse-slow"
        ></div>

        {/* Hero Image */}
        <img
          className="w-full h-full object-cover rounded-l-3xl shadow-2xl 
          transform transition-transform duration-500 hover:scale-105"
          src={assets.hero_img}
          alt="Latest Arrivals"
        />

        {/* Free Shipping Badge */}
        <div 
          className="absolute bottom-8 right-8 bg-white p-4 rounded-xl shadow-lg 
          transform transition-all duration-500 hover:scale-105 hover:shadow-xl
          opacity-0 animate-delay-1000 animate-fade-in-up"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
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