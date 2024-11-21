// import React from 'react'
// import {assets } from '../assets/assets'
// const Footer = () => {
//   return (
//     <div>
//       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_fr] gap-14 my-10 mt-40 text-sm'>

//         <div>
//           <img src={assets.logo} className='mb-5 w-12' alt=""  />
//           <p className='w-full md:w-1/2 text-gray-600'>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto et debitis similique voluptates distinctio facere ducimus. Dolorum itaque ea quae quod quaerat similique, fuga iste magnam consequatur cupiditate? Alias, dolor.
//           </p>
//         </div>

//         <div>
//           <p className='text-xl font-medium mb-5'>COMPANY</p>
//           <ul className='flex flex-col gap-1 text-gray-600'></ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Footer;
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        {/* Left Section */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold">FOREVER<span className="text-pink-500">.</span></h2>
          <p className="text-gray-600 mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Middle Section */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-gray-800">Home</a></li>
            <li><a href="#" className="hover:text-gray-800">About us</a></li>
            <li><a href="#" className="hover:text-gray-800">Delivery</a></li>
            <li><a href="#" className="hover:text-gray-800">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">GET IN TOUCH</h3>
          <p className="text-gray-600">+1-212-456-7890</p>
          <p className="text-gray-600">contact@foreveryou.com</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center">
        <p className="text-gray-600">
          Copyright 2024© forever.com - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
