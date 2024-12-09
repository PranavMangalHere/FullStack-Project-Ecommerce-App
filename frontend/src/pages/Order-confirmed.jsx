import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Home, ShoppingCart } from "lucide-react";
import axios from "axios";

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedOrderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    setOrderDetails(storedOrderDetails);

    const sendConfirmationEmail = async () => {
      try {
        if (storedOrderDetails) {
          await axios.post("/api/orders/confirm", {
            email: storedOrderDetails.email,
            orderNumber: storedOrderDetails.orderNumber,
            totalAmount: storedOrderDetails.totalAmount,
            items: storedOrderDetails.items,
          });
        }
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
      }
    };

    if (storedOrderDetails) {
      sendConfirmationEmail();
      localStorage.removeItem("orderDetails");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-sky-100 p-4">
      <div
        className="relative bg-white shadow-2xl rounded-3xl p-10 text-center max-w-xl w-full 
                      transform transition-all duration-300 hover:scale-[1.02] 
                      border-4 border-transparent hover:border-emerald-200"
      >
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-100 rounded-full 
                       opacity-50 blur-2xl"
          ></div>
          <div
            className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100 rounded-full 
                       opacity-50 blur-2xl"
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500 text-white rounded-full p-5 shadow-lg animate-pulse">
              <Check size={72} strokeWidth={3} />
            </div>
          </div>

          <h2
            className="text-5xl font-extrabold text-emerald-600 mb-4 tracking-tight 
                         bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600"
          >
            Order Confirmed!
          </h2>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Your purchase was successful. Thank you for your order!
          </p>

          {orderDetails && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-emerald-700">
                <ShoppingCart size={20} />
                <span className="font-semibold">
                  Order #{orderDetails.orderNumber}
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                Total Amount: ${orderDetails.totalAmount.toFixed(2)}
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 
                         bg-gradient-to-r from-emerald-500 to-blue-600 
                         text-white py-3 px-6 rounded-lg
                         hover:from-emerald-600 hover:to-blue-700 
                         transition-all duration-300
                         shadow-md hover:shadow-xl transform hover:-translate-y-1
                         focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            >
              <Home size={20} />
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
