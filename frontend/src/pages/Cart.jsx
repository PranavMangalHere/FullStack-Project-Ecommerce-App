import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Load saved cart items from localStorage on initial render
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartData(getCartData(savedCartItems));

    // Synchronize cartItems with localStorage when cartItems changes
    if (cartItems && Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

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
                  onClick={() => updateQuantity(item._id, item.size, 0)} // Set quantity to 0 for deletion
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
