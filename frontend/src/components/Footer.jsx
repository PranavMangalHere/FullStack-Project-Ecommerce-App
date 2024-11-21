import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await fetch("/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Subscription successful");
        e.target.email.value = "";
      } else {
        alert("Subscription failed");
      }
    } catch (error) {
      console.error(error);
      alert("Subscription failed");
    }
  };

  return (
    <footer className="bg-zinc-100 text-black py-5">
      <div className="container mx-auto grid grid-cols-2 gap-10 text-left">
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <p className="text-sm">© 2023 ZOOSKO. All rights reserved.</p>
        </div>

        {/* Right Section (Subscribe Form and Social Links) */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <form onSubmit={handleSubscribe} className="flex justify-center mb-4">
            <input
              type="email"
              className="p-2 rounded-l-md bg-gray-800 text-gray-300 placeholder-gray-100 drop-shadow-xl"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-xl"
            >
              Subscribe
            </button>
          </form>
          <div className="flex justify-center space-x-10 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-400">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
