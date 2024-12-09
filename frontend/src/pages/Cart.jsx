// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/Shopcontext";
// import Title from "../components/Title";
// import { assets } from "../assets/assets";
// import CartTotal from "../components/CartTotal";

// const Cart = () => {
//   const { products, currency, cartItems, updateQuantity, navigate } =
//     useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {
//     // Load saved cart items from localStorage on initial render
//     const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
//     setCartData(getCartData(savedCartItems));

//     // Synchronize cartItems with localStorage when cartItems changes
//     if (cartItems && Object.keys(cartItems).length > 0) {
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   const getCartData = (cartItems) => {
//     return Object.entries(cartItems).flatMap(([productId, sizes]) =>
//       Object.entries(sizes)
//         .filter(([size, quantity]) => quantity > 0)
//         .map(([size, quantity]) => ({
//           _id: productId,
//           size,
//           quantity,
//         }))
//     );
//   };

//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <Title text1={"YOUR"} text2={"CART"} />
//       </div>

//       <div>
//         {cartData.length === 0 ? (
//           <p className="text-gray-700">Your cart is empty.</p>
//         ) : (
//           cartData.map((item) => {
//             const productData = products.find(
//               (product) => product._id === item._id
//             );

//             if (!productData) {
//               return null;
//             }

//             return (
//               <div
//                 key={`${item._id}-${item.size}`}
//                 className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//               >
//                 <div className="flex items-start gap-6">
//                   <img
//                     className="w-16 sm:w-20"
//                     src={productData.image[0]}
//                     alt={productData.name}
//                   />
//                   <div>
//                     <p className="text-xs sm:text-lg font-medium">
//                       {productData.name}
//                     </p>
//                     <div className="flex items-center gap-5 mt-2">
//                       <p>
//                         {currency}
//                         {productData.price}
//                       </p>
//                       <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
//                         {item.size}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <input
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value === "" || value === "0") {
//                       return;
//                     }
//                     updateQuantity(item._id, item.size, Number(value));
//                   }}
//                   className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
//                   type="number"
//                   min={1}
//                   defaultValue={item.quantity}
//                 />
//                 <img
//                   onClick={() => updateQuantity(item._id, item.size, 0)} // Set quantity to 0 for deletion
//                   className="w-4 mr-4 sm:w-5 cursor-pointer"
//                   src={assets.bin_icon}
//                   alt="Delete"
//                 />
//               </div>
//             );
//           })
//         )}
//       </div>

//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end">
//             <button
//               onClick={() => navigate("./place-order")}
//               className="bg-black text-white text-sm my-8 px-8 py-3"
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import axios from "axios";

const Cart = () => {
  const { products, currency, cartItems, setCartItems, updateQuantity, navigate, user } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart for logged-in users
  const fetchCartFromBackend = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cart/${username}`
      );
      const backendCart = response.data.items.map((item) => ({
        _id: item.productId,
        size: item.size,
        quantity: item.quantity,
      }));
      // Sync cart context
      const cartObj = backendCart.reduce((acc, item) => {
        acc[item._id] = acc[item._id] || {};
        acc[item._id][item.size] = item.quantity;
        return acc;
      }, {});
      setCartItems(cartObj); // Update cartItems in context
      setCartData(backendCart); // Update local state
    } catch (err) {
      console.error("Error fetching cart from backend:", err);
      setCartData([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart for guest users from localStorage
  const fetchCartForGuest = () => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(savedCartItems); // Sync cartItems in context
    setCartData(getCartData(savedCartItems)); // Update local state
    setLoading(false);
  };

  // Extract cartData from cartItems object
  const getCartData = (cartItems) => {
    return Object.entries(cartItems).flatMap(([productId, sizes]) =>
      Object.entries(sizes)
        .filter(([size, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          _id: productId,
          size,
          quantity,
        }))
    );
  };

  // Delete item from cart
  const handleDelete = async (productId, size) => {
    try {
      if (user) {
        await axios.delete(
          `http://localhost:5000/api/cart/${user.username}/${productId}/${size}`
        );
      } else {
        // For guests, update localStorage
        const updatedCartItems = { ...cartItems };
        if (updatedCartItems[productId] && updatedCartItems[productId][size]) {
          delete updatedCartItems[productId][size];
          if (Object.keys(updatedCartItems[productId]).length === 0) {
            delete updatedCartItems[productId];
          }
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }
      }
      updateQuantity(productId, size, 0); // Update context
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Load cart data on component mount
  useEffect(() => {
    setLoading(true);
    if (user) {
      fetchCartFromBackend(user.username);
    } else {
      fetchCartForGuest();
    }
  }, [user]);

  // Update localStorage whenever cartItems change (for guest users)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    setCartData(getCartData(cartItems)); // Sync cartData with cartItems
  }, [cartItems]);

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) {
              return null;
            }

            return (
              <div
                key={`${item._id}-${item.size}`}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value === "0") {
                      return;
                    }
                    updateQuantity(item._id, item.size, Number(value));
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => handleDelete(item._id, item.size)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Delete"
                />
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("./place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

