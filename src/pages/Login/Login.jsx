import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import loginImage from "../../assets/loginImage.jpg"; 
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://react-interview.crd4lc.easypanel.host/api/login";
      const response = await axios.post(url, formData);
  
      console.log("Server response:", response);
  
      if (response.data && response.data.data && response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user)); 
        navigate("/");
      } else {
        setError("Login failed: Token not found in the response.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.status_message || "Invalid credentials.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-white rounded-xl shadow-lg backdrop-blur-lg bg-opacity-30">
        <div className="w-full md:w-1/2 p-6 flex justify-center">
          <img
            src={loginImage}
            alt="Login Image"
            className="w-full h-auto max-w-xs"
          />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-center text-3xl font-semibold mb-6 text-blue-400">
            LOGIN
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-600"></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-600"></label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <div className="text-red-900">{error}</div>}
            <button
              type="submit"
              className="text-white btn btn-primary w-full mt-6"
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don&#39;t have an account?{""}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
