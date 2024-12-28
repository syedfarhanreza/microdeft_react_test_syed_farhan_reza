import { useState, useEffect } from "react";
import axios from "axios";
import './Courses.css'; // Importing the CSS for card design

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not logged in. Please log in.");
        setLoading(false);
        return;
      }

      const url = "https://react-interview.crd4lc.easypanel.host/api/course";
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response Data:", response.data); // Log the response to verify

        // Access the courses from response.data.data.data
        const coursesData = response.data.data.data;
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);  // Set courses state if data is an array
        } else {
          setError("No courses found.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="courses-container">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <div className="badge" style={{ backgroundColor: course.badge_color }}>
              {course.badge_text}
            </div>
            <p className="instructor-name">Instructor: {course.instructor_name}</p>
          </div>
        ))
      ) : (
        <div>No courses available</div>
      )}
    </div>
  );
};

export default Courses;
