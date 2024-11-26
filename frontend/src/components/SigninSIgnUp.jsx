import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SigninSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      phone,
      password,
    };

    try {
      let response;
      if (isSignUp) {
        response = await axios.post("http://localhost:5000/signup", data);
        if (response.data.success) {
          alert("SignUp successful!");
          navigate("/");
        }
      } else {
        response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
        if (response.data.success) {
          alert("Login successful!");
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.errors || "An error occurred.");
      console.error(err);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen p-4">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.02]">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-gray-700 text-white"
                placeholder="Choose a username"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition bg-gray-700 text-white 
                ${
                  !email || validateEmail(email)
                    ? "border-gray-600 focus:ring-indigo-500"
                    : "border-red-500 focus:ring-red-500"
                }`}
              placeholder="Enter your email"
            />
            {email && !validateEmail(email) && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          {isSignUp && (
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-gray-700 text-white"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition pr-12 bg-gray-700 text-white 
                  ${
                    !password || validatePassword(password)
                      ? "border-gray-600 focus:ring-indigo-500"
                      : "border-red-500 focus:ring-red-500"
                  }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {password && !validatePassword(password) && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 8 characters long
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={
              (isSignUp &&
                (!username ||
                  !validateEmail(email) ||
                  !validatePassword(password))) ||
              (!isSignUp && (!validateEmail(email) || !password))
            }
            className="w-full rounded-3xl py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold 
              hover:from-indigo-700 hover:to-purple-700 transition duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed "
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span
            className="text-sm text-indigo-400 cursor-pointer hover:text-indigo-500 transition"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninSignUp;
