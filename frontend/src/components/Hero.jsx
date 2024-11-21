import { assets } from "../constants/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 bg-gray-50">
      {/* Hero left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-6">
        <div className="text-[#414141] max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2 mt-1"></div>
          <button>Shop Now</button>
        </div>
        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
      </div>
      {/* Hero right side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center">
        <img
          className="w-full h-auto rounded-lg shadow-lg"
          src={assets.hero_img}
          alt="Latest Arrivals"
        />
      </div>
    </div>
  );
};

export default Hero;
