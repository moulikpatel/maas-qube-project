import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [ischange, setischange] = useState(false);
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const token = localStorage.getItem("token");
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        currentPassword: oldpassword,
        newPassword: newpassword,
      };
      const res = await axios.put(
        "http://localhost:3000/auth/update-password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
          transition: Bounce,
        });
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
    <div className="h-screen w-screen">
      <Navbar />
      <div className="pl-[3vw] mt-[4vw]">
        <h1 className="font-medium text-[3vw]">Dashboard</h1>
        <div className="flex flex-col gap-4 mt-5 p-5">
          <input
            className=" placeholder:text-black px-1 py-1 border-[1.5px] border-zinc-400 rounded-md"
            type="text"
            placeholder="Name"
            value={name}
          />
          <input
            className=" placeholder:text-black px-1 py-1 border-[1.5px] border-zinc-400 rounded-md"
            type="email"
            placeholder="email"
            value={email}
          />
          <button
            onClick={() => setischange(true)}
            className="bg-blue-400 py-2 text-white font-medium hover:bg-blue-500"
          >
            Change password
          </button>
        </div>
      </div>
      {ischange && (
        <div className=" mt-5 p-5 pl-[3vw]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleChangePassword}
            action=""
          >
            <input
              onChange={(e) => setoldpassword(e.target.value)}
              className=" placeholder:text-black px-1 py-1 border-[1.5px] border-zinc-400 rounded-md"
              type="password"
              placeholder="Enter old password"
            />
            <input
              onChange={(e) => setnewpassword(e.target.value)}
              className=" placeholder:text-black px-1 py-1 border-[1.5px] border-zinc-400 rounded-md"
              type="password"
              placeholder="Enter New password"
            />
            <button
              type="submit"
              onClick={() => setischange(true)}
              className="bg-blue-400 py-2 text-white font-medium hover:bg-blue-500"
            >
              Confirm Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
