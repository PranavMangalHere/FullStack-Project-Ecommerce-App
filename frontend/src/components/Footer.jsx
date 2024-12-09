import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AlertCircle, CheckCircle } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscriptionStatus("success");
        setEmail("");

        // Clear status after 3 seconds
        setTimeout(() => {
          setSubscriptionStatus(null);
        }, 3000);
      } else {
        setSubscriptionStatus("error");

        // Clear status after 3 seconds
        setTimeout(() => {
          setSubscriptionStatus(null);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setSubscriptionStatus("error");

      // Clear status after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-zinc-100 to-zinc-200 text-black py-8 shadow-lg">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ZOOSKO</h1>
          <p className="text-sm text-gray-600">
            © 2024 ZOOSKO. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Stay Updated
          </h2>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <div className="flex">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Subscribe
              </button>
            </div>

            {subscriptionStatus === "success" && (
              <div className="mt-2 flex items-center text-green-600">
                <CheckCircle className="mr-2" size={20} />
                Subscription successful!
              </div>
            )}

            {subscriptionStatus === "error" && (
              <div className="mt-2 flex items-center text-red-600">
                <AlertCircle className="mr-2" size={20} />
                Subscription failed. Please try again.
              </div>
            )}
          </form>

          <div className="flex space-x-6 mt-8">
            {[
              { Icon: FaFacebook, color: "text-blue-700" },
              { Icon: FaTwitter, color: "text-blue-400" },
              { Icon: FaInstagram, color: "text-pink-500" },
              { Icon: FaLinkedin, color: "text-blue-800" },
            ].map(({ Icon, color }, index) => (
              <a
                key={index}
                href="#"
                className={`${color} hover:opacity-75 transition duration-300`}
              >
                <Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
