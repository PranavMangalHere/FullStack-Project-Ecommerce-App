import { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/Shopcontext";
const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Get the subtotal and calculate the total
  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  // Function to format the currency value
  const formatCurrency = (amount) => {
    return `${currency} ${amount.toFixed(2)}`; // Ensure two decimal places
  };

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{formatCurrency(delivery_fee)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{formatCurrency(total)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
