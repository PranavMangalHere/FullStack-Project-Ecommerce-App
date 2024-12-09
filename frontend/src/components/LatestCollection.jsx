import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added for smoother animations
import { ShopContext } from "../context/Shopcontext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const sortedProducts = [...products].sort(
      (a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
    );
    
    const filteredProducts = sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setLatestProducts(filteredProducts.slice(0, visibleProducts));
  }, [products, visibleProducts, searchQuery]);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 5);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-10"
    >
      <div className="text-center mb-8">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl mx-auto text-sm text-gray-600 mt-4"
        >
          Discover our newest arrivals - fresh styles curated just for you
        </motion.p>
      </div>

      {/* Search Bar with Smooth Transition */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6"
      >
        <input
          type="text"
          placeholder="Search by product name..."
          className="w-full max-w-sm px-4 py-2 border rounded-md text-sm 
            focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent 
            transition-all duration-300 ease-in-out"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Product Grid with Enhanced Animations */}
      <AnimatePresence>
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {latestProducts.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)"
              }}
              className="overflow-hidden rounded-lg"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Load More Button with Smooth Interaction */}
      {visibleProducts < products.length && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={handleLoadMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="px-6 py-2 bg-black text-white rounded-full 
              hover:bg-gray-800 transition-colors duration-300 
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Load More
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LatestCollection;