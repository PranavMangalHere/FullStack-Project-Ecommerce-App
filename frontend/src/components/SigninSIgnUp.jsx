import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isSignUp ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700 transition duration-200"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span
            className="text-sm text-indigo-600 cursor-pointer"
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
