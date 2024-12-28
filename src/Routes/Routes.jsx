import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import CreateCourse from "../pages/CreateCourse/CreateCourse";
import Courses from "../pages/Courses/Courses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        { 
            path: "/", 
            element: <Home></Home> 
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
            path: "register",
            element: <Register></Register>
        },
        {
          path: "courses",
          element: <Courses></Courses>
        },
        {
            path: "create-course",
            element: <CreateCourse></CreateCourse>
        }
    ],
  },
]);
