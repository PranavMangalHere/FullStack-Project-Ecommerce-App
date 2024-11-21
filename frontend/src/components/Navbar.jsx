import { useState } from "react";
import { assets } from "../constants/assets";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

 const handleSignIn = async (email, password) => {
   try {
     const response = await fetch("http://localhost:8080/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email, password }),
     });

     const data = await response.json();

     if (response.ok) {
       setIsAuthenticated(true); // Update authentication status
       localStorage.setItem("token", data.token); // Store token
     } else {
       console.error(data.message); // Handle error
     }
   } catch (error) {
     console.error("Error during sign-in:", error);
   }
 };

  const handleLogout = () => {
    setIsAuthenticated(false); // Update authentication status
    localStorage.removeItem("token"); // Clear token
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white shadow-lg sticky top-0 z-10">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-8 text-sm text-gray-800">
        <NavLink
          to="/"
          className="flex flex-col items-center transition duration-200 ease-in-out hover:text-blue-500"
        >
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[2px] bg-blue-500 hidden" />
        </NavLink>

        <NavLink
          to="/collection"
          className="flex flex-col items-center transition duration-200 ease-in-out hover:text-blue-500"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[2px] bg-blue-500 hidden" />
        </NavLink>

        <NavLink
          to="/about"
          className="flex flex-col items-center transition duration-200 ease-in-out hover:text-blue-500"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[2px] bg-blue-500 hidden" />
        </NavLink>

        <NavLink
          to="/contact"
          className="flex flex-col items-center transition duration-200 ease-in-out hover:text-blue-500"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[2px] bg-blue-500 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer transition duration-200 ease-in-out hover:scale-110"
          alt="Search"
        />

        <div className="group relative">
          <img
            className="w-5 cursor-pointer transition duration-200 ease-in-out hover:scale-110"
            src={assets.profile_icon}
            alt="Profile"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 p-1-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
              {isAuthenticated ? (
                <>
                  <p
                    className="cursor-pointer hover:text-blue-500 transition duration-400"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </p>
                  <p className="cursor-pointer hover:text-blue-500 transition duration-400">
                    My Profile
                  </p>
                  <p className="cursor-pointer hover:text-blue-500 transition duration-400">
                    Orders
                  </p>
                </>
              ) : (
                <p
                  className="cursor-pointer hover:text-blue-500 transition duration-400"
                  onClick={() => handleSignIn()}
                >
                  <NavLink to="/SigninSIgnUp">Sign In</NavLink>
                </p>
              )}
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 cursor-pointer transition duration-200 ease-in-out hover:scale-110"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-3 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]"></p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden transition duration-200 ease-in-out hover: scale-110"
          alt="Menu"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Back"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200 hover:bg-gray-100"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200 hover:bg-gray-100"
            to="/collections"
          >
            COLLECTIONS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200 hover:bg-gray- 100"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b border-gray-200 hover:bg-gray-100"
            to="/contact"
          >
            CONTACT
          </NavLink>
          {isAuthenticated ? (
            <p
              onClick={() => {
                handleLogout();
                setVisible(false);
              }}
              className="py-2 pl-6 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              LOGOUT
            </p>
          ) : (
            <p
              onClick={() => {
                handleSignIn();
                setVisible(false);
              }}
              className="py-2 pl-6 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              <NavLink
                to="/SigninSIgnUp"
                className="cursor-pointer hover:text-blue-500 transition duration-400"
              >
                Sign In
              </NavLink>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
