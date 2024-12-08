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
