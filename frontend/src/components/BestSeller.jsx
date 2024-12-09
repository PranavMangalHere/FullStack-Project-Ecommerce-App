import { useContext, useEffect, useState } from "react";
import { Star } from "lucide-react";

import { ShopContext } from "../context/Shopcontext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  // Retrieve products from shop context
  const { products } = useContext(ShopContext);
  
  // State to store best-selling products
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to determine best sellers
  useEffect(() => {
    // Simulate loading effect
    setIsLoading(true);
    const timer = setTimeout(() => {
      // First, filter products marked as best sellers
      const actualBestSellers = products.filter((item) => item.bestSeller);

      // If best sellers exist, take first 5. Otherwise, take first 5 products
      setBestSellers(
        actualBestSellers.length > 0
          ? actualBestSellers.slice(0, 5)
          : products.slice(0, 5)
      );
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [products]);

  return (
    <div className={`
      container mx-auto px-4 my-16
      transition-all duration-500 ease-in-out
      ${isLoading ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
    `}>
      {/* Section Header */}
      <div className="text-center mb-12">
        <Title text1="BEST" text2="SELLERS" />
        
        {/* Star Rating with Subtle Hover */}
        <div className="flex justify-center items-center text-yellow-500 mt-4">
          {[...Array(5)].map((_, index) => (
            <Star 
              key={index} 
              className="
                mx-1 
                transition-all duration-300 
                hover:scale-110 hover:text-yellow-400
                cursor-pointer
              " 
              fill="currentColor" 
            />
          ))}
        </div>
        
        {/* Description with Transition */}
        <p className={`
          max-w-2xl mx-auto mt-4 text-gray-600
          transition-all duration-500 delay-200
          transform
          opacity-0 translate-y-4
          ${!isLoading ? 'opacity-100 translate-y-0' : ''}
        `}>
          Discover our top-performing products that customers love most. 
          These bestsellers are selected based on popularity and customer satisfaction.
        </p>
      </div>

      {/* Product Grid with Enhanced Transitions */}
      <div className={`
        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6
        transition-all duration-500 ease-in-out
        ${isLoading ? 'opacity-50 translate-y-4' : 'opacity-100 translate-y-0'}
      `}>
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="
              group
              transform transition-all duration-300 
              hover:scale-105 hover:shadow-lg
              hover:-translate-y-2
              rounded-lg overflow-hidden
            "
          >
            <ProductItem
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;