

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-zinc-800 h-72" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-16 pb-20">
            <div className="bg-zinc-100 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 sm:p-12">
                <h1 className="text-6xl font-bold text-gray-900 mb-8 text-center">
                  About <span className="text-blue-800">FOREVER</span>
                </h1>

                <div className="grid md:grid-cols-2 gap-11 mb-12">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Welcome to{" "}
                      <span className="font-semibold text-blue-800">
                        FOREVER
                      </span>
                      ! Here, we believe that shopping should be an enjoyable
                      and seamless experience. Our mission is to bring you the
                      best selection of high-quality products at competitive
                      prices, all while providing exceptional customer service.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      What sets us apart is our commitment to our customers. We
                      understand that shopping online can sometimes be
                      overwhelming, which is why our user-friendly website is
                      designed to make your experience as smooth as possible.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Our dedicated customer support team is always here to
                      help, whether you have questions about a product, need
                      assistance with your order, or simply want to share your
                      feedback.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Thank you for choosing us. We look forward to serving you!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-blue-800"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-800 mb-4 relative">
                        Quality Products
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-full"></span>
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Carefully curated selection of premium items for our
                        customers.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-800 mb-4 relative">
                        24/7 Support
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-full"></span>
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Our team is always available to assist you with any
                        queries.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-100">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-800 mb-4 relative">
                        Fast Shipping
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-400 rounded-full"></span>
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Quick and reliable delivery to your doorstep.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
