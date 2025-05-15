import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [Books, setBooks] = useState([]);
  const id = localStorage.getItem("id");
  useEffect(() => {
    getMyBooks();
  }, []);
  const getMyBooks = async () => {
    try {
      const books = await axios.get(`http://localhost:3000/book/mybooks/${id}`);
      setBooks(books.data.mybooks);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="p-5">
        <h1 className="text-[2vw] font-bold">My Books</h1>
        <div className="grid grid-cols-3 ">
          {Books?.map((item, i) => {
            console.log(item);

            return (
              <div className="w-[20vw] h-[31vw] p-2 shadow-lg">
                <img src={item.image} alt="" />
                <h1 className="mt-2 font-medium">{item.bookName}</h1>
                <Link to={`/book/${item._id}`}>
                  <button className="w-full bg-blue-400 hover:bg-blue-500 text-white p-2 mt-10">
                    View Book
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Books;
