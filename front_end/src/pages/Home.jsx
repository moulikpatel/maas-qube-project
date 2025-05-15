import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import books from "/book.gif";
import { Link } from "react-router-dom";

const Home = () => {
  const [Books, setBooks] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const books = await axios.get("http://localhost:3000/book/all");
      setBooks(books.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex justify-center w-full h-full">
        <div className="w-[90%] h-full p-3">
          {Books.length == 0 ? (
            <div className="h-full w-full flex flex-col justify-start items-center">
              <img className="" src={books} />
              <h1 className="font-bold text-2xl">No Books to Show</h1>
            </div>
          ) : (
            <div className="grid grid-cols-3 ">
              {Books.map((item, i) => {
                console.log(item);

                return (
                  <div className="w-[20vw] h-[31vw] p-2 shadow-lg">
                    <img src={item.image} alt="" />
                    <h1 className="mt-2 font-medium">{item.bookName}</h1>
                    <p className="text-zinc-500 mt-3">{item.user.name}</p>
                  <Link to={`/book/${item._id}`}>
                    <button className="w-full bg-blue-400 hover:bg-blue-500 text-white p-2 mt-5">
                      View Book
                    </button>
                  </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
