// import React ,{useState}from 'react'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'
// import { assets } from '../assets/assets'

// const PlaceOrder = () => {

//   const [method,setMethod] = useState('cod');

//   return (
//     <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//       <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

//         <div className='text-xl sm:text-2xl my-3'>
//           <Title text1={'DILLIVERY'} text2={'INFORMATION'}/>
//         </div>
//         <div className='flex gap-3'>
//           <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First name' type="text" />
//           <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last name' type="text" />
//         </div>
//         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='email address' type="email" />
//         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" />
//         <div className='flex gap-3'>
//         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" />
//         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" />
//         </div>
//         <div className='flex gap-3'>
//         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' type="Number" />
//         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" />
//         </div>
//         <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone'   type="Number" />
//       </div>

//       <div className='mt-8'>

//         <div className='mt-8 min-w-80'>
//           <CartTotal/>
//         </div>

//         <div className='mt-12'>
//             <Title text1={'PAYMENT'} text2={'METHOD'}/>

//             <div onClick={()=>setMethod('stripe')} className='flex gap-3 flex-col lg:flex-row'>
//               <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                 <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' :''} `}></p>
//                 <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
//               </div>
//               <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                 <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' :''}  `}></p>
//                 <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
//               </div>
//               <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                 <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' :''}  `}></p>
//                 <p >CASH ON DELIVERY</p>
//               </div>

//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PlaceOrder

import  { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zipcode"
            type="number"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      {/* Order Summary and Payment Method */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            {[
              { id: "stripe", label: "Stripe", logo: assets.stripe_logo },
              { id: "razorpay", label: "Razorpay", logo: assets.razorpay_logo },
              { id: "cod", label: "Cash on Delivery" },
            ].map((option) => (
              <div
                key={option.id}
                onClick={() => handlePaymentMethodChange(option.id)}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  method === option.id ? "border-green-400" : ""
                }`}
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === option.id ? "bg-green-400" : ""
                  }`}
                ></p>
                {option.logo && (
                  <img
                    className="h-5 mx-4"
                    src={option.logo}
                    alt={option.label}
                  />
                )}
                <p>{option.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
