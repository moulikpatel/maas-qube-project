import React, { useState } from "react";
import register from "/register.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const formData = { name, email, password };
      const res = await axios.post(
        "http://localhost:3000/auth/signup",
        formData
      );
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });

        // ✅ navigate after short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.warn(res.data.message || "Signup failed", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[50%] shadow-xl h-screen">
        <img className="h-screen" src={register} alt="" />
      </div>
      <div className="w-[50%] h-screen">
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <form
            className="flex flex-col items-center gap-4 w-full"
            onSubmit={handleSignup}
          >
            <input
              onChange={(e) => setname(e.target.value)}
              className="w-[60%] px-2 py-2 border-[1.5px] border-zinc-400 rounded-md"
              type="text"
              placeholder="Name"
            />
            <input
              onChange={(e) => setemail(e.target.value)}
              className="w-[60%] px-2 py-2 border-[1.5px] border-zinc-400 rounded-md"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setpassword(e.target.value)}
              className="w-[60%] px-2 py-2 border-[1.5px] border-zinc-400 rounded-md"
              type="password"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-[60%] font-medium px-2 py-2 border-[1.5px] bg-blue-400 hover:bg-blue-500 text-white rounded-md"
            >
              Signup
            </button>
          </form>
          <p className="font-medium">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
