/* eslint-disable no-unused-vars */
import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        About Us
      </h1>

      <p className="text-gray-700 mb-5 leading-relaxed">
        Welcome to <span className="font-semibold text-blue-600">ZOOSKO</span>!
        Here, we believe that shopping should be an enjoyable and seamless
        experience. Our mission is to bring you the best selection of
        high-quality products at competitive prices, all while providing
        exceptional customer service.
      </p>

      <p className="text-gray-700 mb-5 leading-relaxed">
        What sets us apart is our commitment to our customers. We understand
        that shopping online can sometimes be overwhelming, which is why our
        user-friendly website is designed to make your experience as smooth as
        possible.
      </p>

      <p className="text-gray-700 mb-5 leading-relaxed">
        Our dedicated customer support team is always here to help, whether you
        have questions about a product, need assistance with your order, or
        simply want to share your feedback.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Thank you for choosing us. We look forward to serving you!
      </p>
    </div>
  );
};

export default About;