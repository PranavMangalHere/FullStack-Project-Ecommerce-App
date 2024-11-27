import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import { Star } from "lucide-react";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const actualBestSellers = products.filter((item) => item.bestSeller);
    setBestSellers(
      actualBestSellers.length > 0
        ? actualBestSellers.slice(0, 5)
        : products.slice(0, 5)
    );
  }, [products]);

  return (
    <div className="container mx-auto px-4 my-16">
      <div className="text-center mb-12">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <div className="flex justify-center items-center text-yellow-500 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="mx-1" fill="currentColor" />
          ))}
        </div>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600">
          Discover our top-performing products that customers love most. These
          bestsellers are selected based on popularity and customer
          satisfaction.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSellers.map((item) => (
          <div
            key={item.id}
            className="transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <ProductItem
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
