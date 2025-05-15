import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { CircleArrowLeft } from "lucide-react";
import { Bounce, toast } from "react-toastify";
const Viewbook = () => {
  const { id } = useParams();
  const [book, setbook] = useState("");
  useEffect(() => {
    getBook();
  }, []);
  const navigate = useNavigate();
  const getBook = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/book/${id}`);
      setbook(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:3000/book/${id}`);
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
    <div className="w-screen h-screen">
      <Navbar />
      <Link to={"/home"}>
        {" "}
        <CircleArrowLeft size={28} className="m-3" />
      </Link>
      <div className="w-full h-full flex p-8">
        <div className="w-[50%] h-full ">
          <img className="h-[70%]" src={book.image} alt="" />
        </div>
        <div className="w-[50%] h-full p-5">
          <h1 className="text-[2vw]">Book Name : {book.bookName}</h1>
          <h1 className="text-gray-500 text-lg mt-2">
            Author : {book.authorName}
          </h1>
          <h1 className="mt-2">
            Publish Date : {book.publishDate?.slice(0, 10)}
          </h1>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleDelete}
              className="px-4 py-3 bg-red-500 text-white"
            >
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewbook;
