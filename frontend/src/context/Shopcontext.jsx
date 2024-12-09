// /* eslint-disable react/prop-types */
// /* eslint-disable no-empty */
// /* eslint-disable no-unused-vars */
// import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "$";
//   const delivery_fee = 10;
//   const [cartItems, setCartItems] = useState({});
//   const navigate = useNavigate();

//   const deepClone = (obj) => JSON.parse(JSON.stringify(obj)); // Deep clone utility

//   // Load saved cart from localStorage on initial render
//   useEffect(() => {
//     const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
//     setCartItems(savedCartItems);
//   }, []);

//   // Sync cart items with localStorage
//   useEffect(() => {
//     if (cartItems && Object.keys(cartItems).length > 0) {
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("Select the product size");
//       return;
//     }

//     let cartData = deepClone(cartItems); // Use deepClone here
//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }
//     setCartItems(cartData);
//   };

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalCount += cartItems[items][item];
//           }
//         } catch (err) {}
//       }
//     }
//     return totalCount;
//   };

//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = deepClone(cartItems); // Use deepClone here

//     if (cartData[itemId] && cartData[itemId][size] !== undefined) {
//       cartData[itemId][size] = quantity;
//       setCartItems(cartData);
//     }
//   };

//   // Remove item or size from the cart
//   const removeFromCart = (itemId, size) => {
//     let cartData = deepClone(cartItems);

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         delete cartData[itemId][size]; // Remove the size
//         // If no sizes left for the product, remove the product
//         if (Object.keys(cartData[itemId]).length === 0) {
//           delete cartData[itemId];
//         }
//       }
//     }

//     setCartItems(cartData);
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;

//     for (const items in cartItems) {
//       const itemInfo = products.find(
//         (product) => String(product._id) === String(items)
//       ); // Ensure type match
//       if (itemInfo) {
//         for (const item in cartItems[items]) {
//           try {
//             if (cartItems[items][item] > 0) {
//               totalAmount += itemInfo.price * cartItems[items][item];
//             }
//           } catch (error) {}
//         }
//       }
//     }

//     return totalAmount;
//   };

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     cartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     removeFromCart, // Expose removeFromCart to the rest of the app
//     navigate,
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 100;
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null); // Store the current user
  const navigate = useNavigate();

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj)); // Deep clone utility

  // Fetch the cart from the backend when the user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:5000/api/cart/${user.username}`);
          const backendCart = response.data.items.reduce((acc, item) => {
            if (!acc[item.productId]) {
              acc[item.productId] = {};
            }
            acc[item.productId][item.size] = item.quantity;
            return acc;
          }, {});
          setCartItems(backendCart);
        } catch (error) {
          console.error("Error fetching cart from backend:", error);
          setCartItems({});
        }
      } else {
        // Reset to localStorage cart for guests
        const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
        setCartItems(savedCartItems);
      }
    };

    fetchCart();
  }, [user]);

  // Sync cart with localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select the product size");
      return;
    }

    let cartData = deepClone(cartItems);
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

    if (user) {
      try {
        await saveCartToBackend(cartData);
      } catch (error) {
        console.error("Error updating cart in backend:", error);
      }
    }
  };

  const saveCartToBackend = async (cartData) => {
    const items = Object.entries(cartData).flatMap(([productId, sizes]) =>
      Object.entries(sizes).map(([size, quantity]) => ({
        productId,
        size,
        quantity,
      }))
    );

    await axios.post("http://localhost:5000/api/cart", { username: user.username, items });
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = deepClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;

      if (quantity === 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      setCartItems(cartData);

      if (user) {
        try {
          await saveCartToBackend(cartData);
        } catch (error) {
          console.error("Error updating cart in backend:", error);
        }
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const itemInfo = products.find((product) => String(product._id) === String(items));
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
    updateQuantity,
    getCartCount, // Ensure this is included and implemented
    getCartAmount,
    setCartItems,
    setUser, // Expose setUser to change the user
    user,
    navigate,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
