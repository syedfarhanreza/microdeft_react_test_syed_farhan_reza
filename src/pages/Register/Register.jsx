import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../../assets/registerImage.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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
      const url = "https://react-interview.crd4lc.easypanel.host/api/register";
      const { data: res } = await axios.post(url, formData);
      console.log("Registration Response:", res);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.status_message || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row-reverse items-center justify-center w-full max-w-4xl bg-white rounded-xl shadow-2xl backdrop-blur-lg bg-opacity-30">
        <div className="w-full md:w-1/2 p-6 hidden md:block">
          <img
            src={registerImage}
            alt="Register"
            className="w-full h-auto max-w-xs"
          />
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-center text-3xl font-semibold mb-6 text-blue-400">
            REGISTER
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="Name" className="block text-gray-600"></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400"
                placeholder="Enter your Name"
                required
              />
            </div>
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
            {error && (
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="text-white btn btn-primary w-full mt-6"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
