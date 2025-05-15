import React, { useState } from "react";
import login from "/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = { email, password };
      const res = await axios.post(
        "http://localhost:3000/auth/login",
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
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        // console.log( res.data);

        // ✅ navigate after short delay
        setTimeout(() => {
          navigate("/home");
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
      <div className="w-[50%] h-screen shadow-xl">
        <img className="h-screen" src={login} alt="" />
      </div>
      <div className="w-[50%] h-screen">
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
          <h1 className="font-bold text-2xl">Login</h1>
          <form className="flex flex-col items-center gap-4 w-full" action="">
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
              onClick={handleLogin}
              className="w-[60%] font-medium px-2 py-2 border-[1.5px] bg-[#f46a4f] hover:bg-[#ff5d3d] text-white rounded-md"
            >
              Login
            </button>
          </form>
          <p className="font-medium">
            Don't have an account?{" "}
            <Link to={"/"} className="text-[#00D3BF]">
              Signup
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
