import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ToastContainer, Bounce } from "react-toastify";
import Createbook from "./pages/Createbook";
import Books from "./pages/Books";
import Viewbook from "./pages/Viewbook";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path:"/createbook",
      element:<Createbook/>
    },
    {
      path:"/books",
      element:<Books/>
    },
    {
      path:"/book/:id",
      element:<Viewbook/>
    }
  ]);
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
