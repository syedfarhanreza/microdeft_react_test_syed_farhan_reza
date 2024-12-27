import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";

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
            path: "register",
            element: <Register></Register>
        }
    ],
  },
]);
