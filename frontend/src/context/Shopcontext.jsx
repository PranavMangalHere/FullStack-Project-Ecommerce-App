/* eslint-disable react/prop-types */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj)); // Deep clone utility

  // Load saved cart from localStorage on initial render
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(savedCartItems);
  }, []);

  // Sync cart items with localStorage
  useEffect(() => {
    if (cartItems && Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select the product size");
      return;
    }

    let cartData = deepClone(cartItems); // Use deepClone here
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (err) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = deepClone(cartItems); // Use deepClone here

    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }
  };

  // Remove item or size from the cart
  const removeFromCart = (itemId, size) => {
    let cartData = deepClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        delete cartData[itemId][size]; // Remove the size
        // If no sizes left for the product, remove the product
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const itemInfo = products.find(
        (product) => String(product._id) === String(items)
      ); // Ensure type match
      if (itemInfo) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {}
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    removeFromCart, // Expose removeFromCart to the rest of the app
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
