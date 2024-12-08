import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    email: "", // Added email field
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (selectedMethod) => {
    setMethod(selectedMethod);
  };

const handleCheckout = () => {
  // Validate form data
  const requiredFields = [
    "firstName",
    "lastName",
    "street",
    "city",
    "state",
    "zipcode",
    "phone",
    "email",
  ];

  const isFormValid = requiredFields.every(
    (field) => formData[field].trim() !== ""
  );

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailPattern.test(formData.email);

  if (!isFormValid || !isEmailValid) {
    alert(
      "Please fill in all required fields and provide a valid email address"
    );
    return;
  }

  // Save order details to localStorage
  const orderDetails = {
    email: formData.email,
    orderNumber: Math.floor(Math.random() * 1000000), // Example order number
    totalAmount: 100, // Example total amount
    items: [], // Populate with actual items
  };
  localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

  // Proceed with checkout
  console.log("Checkout with data:", { ...formData, paymentMethod: method });

  // Redirect to the order confirmation page
  navigate("/order-confirmed");
};
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 uppercase">
            Delivery Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street"
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="State"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Zipcode"
              type="number"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              required
            />
            </div>

            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Order Summary and Payment Method */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 uppercase">
              Payment Method
            </ h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { id: "stripe", label: "Stripe", logo: assets.stripe_logo },
                { id: "cod", label: "Cash on Delivery" },
              ].map((option) => (
                <div
                  key={option.id}
                  onClick={() => handlePaymentMethodChange(option.id)}
                  className={`flex items-center justify-center gap-3 border p-3 rounded-md cursor-pointer transition-all duration-300 ${
                    method === option.id
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <div
                    className={`w-4 h-4 border rounded-full ${
                      method === option.id
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}
                  ></div>
                  {option.logo && (
                    <img
                      className="h-6 object-contain"
                      src={option.logo}
                      alt={option.label}
                    />
                  )}
                  <p className="text-sm">{option.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold uppercase tracking-wider shadow-md"
          >
            Complete Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder; 