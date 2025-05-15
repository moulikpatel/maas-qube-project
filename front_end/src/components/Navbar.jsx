import { LogOut, UserRoundPen } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-screen pr-5 p-3 shadow-md flex bg-black text-white border-b-[0.5px] justify-between items-center">
      <ul className="flex w-[100%] justify-center gap-[6vw] font-medium text-[1.4vw]">
        <li>
          <Link to={"/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/createbook"}>Create Book</Link>
        </li>
        <li>
          <Link to={"/books"}>My Books</Link>
        </li>
      </ul>
      <Link
        to={"/dashboard"}
        className="w-[3vw] cursor-pointer h-[3vw] rounded-full bg-purple-600 flex justify-center items-center"
      >
       <h1>{name.charAt(0).toUpperCase().slice(0,1)}</h1>

      </Link>
      <LogOut
        onClick={handleLogout}
        className="ml-7 mr-3 cursor-pointer"
        size={28}
      />
    </div>
  );
};

export default Navbar;
