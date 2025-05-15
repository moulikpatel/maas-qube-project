import React, { useState } from "react";
import Navbar from "../components/Navbar";
import book from "/bbok1.gif";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const Createbook = () => {
  const [bookname, setbookname] = useState("");
  const [authorname, setauthorname] = useState("");
  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      const formdata = {
        bookName: bookname,
        authorName: authorname,
        publishDate: new Date(),
      };

      const token = localStorage.getItem("token");
      if (!token) {
        return alert("You must be logged in to create a book.");
      }

      const res = await axios.post(
        "http://localhost:3000/book/create",
        formdata,
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
      setbookname("");
      setauthorname("");
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
    <div className="w-screen">
      <Navbar />
      <div className="w-full h-[47vw] flex justify-center items-center">
        <div className="w-[50%]">
          <img src={book} alt="" />
        </div>
        <div className="w-[50%] h-screen">
          <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
            <h1 className="font-bold text-2xl">Create Book</h1>
            <form
              onSubmit={handleCreateBook}
              className="flex flex-col items-center gap-4 w-full"
            >
              <input
                value={bookname}
                onChange={(e) => setbookname(e.target.value)}
                className="w-[60%] px-2 py-2 border-[1.5px] border-zinc-400 rounded-md"
                type="text"
                placeholder="Book Name"
              />
              <input
                value={authorname}
                onChange={(e) => setauthorname(e.target.value)}
                className="w-[60%] px-2 py-2 border-[1.5px] border-zinc-400 rounded-md"
                type="text"
                placeholder="Author Name"
              />
              <button
                type="submit"
                className="w-[60%] font-medium px-2 py-2 border-[1.5px] bg-blue-400 hover:bg-blue-500 text-white rounded-md"
              >
                Create Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createbook;
