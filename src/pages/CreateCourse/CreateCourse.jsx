import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    badge_text: "",
    badge_color: "",
    instructor_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = "https://react-interview.crd4lc.easypanel.host/api/course";
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("User is not logged in. Please log in.");
      return;
    }
  
    console.log("Submitting Data:", formData);
  
    try {
      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response:", response.data);
  
      toast.success("Course created successfully!");
  
      setFormData({
        title: "",
        description: "",
        badge_text: "",
        badge_color: "",
        instructor_name: "",
      });
    } catch (error) {
      console.error("Error Response:", error.response);
  
      if (error.response) {
        toast.error(error.response.data.message || "Failed to create course.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-semibold mb-6 text-blue-400">
          Create Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400"
              placeholder="Course Title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400 h-24"
              placeholder="Course Description"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="badge_text" className="block text-gray-600">
              Badge Text
            </label>
            <input
              type="text"
              id="badge_text"
              name="badge_text"
              value={formData.badge_text}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400"
              placeholder="Badge Text"
              required
            />
          </div>
          <div>
            <label htmlFor="badge_color" className="block text-gray-600">
              Badge Color
            </label>
            <input
              type="text"
              id="badge_color"
              name="badge_color"
              value={formData.badge_color}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400"
              placeholder="#ff0000"
              required
            />
          </div>
          <div>
            <label htmlFor="instructor_name" className="block text-gray-600">
              Instructor Name
            </label>
            <input
              type="text"
              id="instructor_name"
              name="instructor_name"
              value={formData.instructor_name}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-gray-700 placeholder-gray-400"
              placeholder="Instructor Name"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white btn btn-primary w-full mt-6"
          >
            Create Course
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateCourse;
