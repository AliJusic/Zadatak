import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function SideBar({ socket }) {
  const [userList, setUserList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  socket.on("online users", (onlineUsers) => {
    setUserList(onlineUsers);
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen flex">
      <div
        className={`fixed top-0 left-0 p-4 z-50  text-white md:hidden ${
          isOpen ? "bg-black" : "bg-gray-700"
        }`}
      >
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full z-40 transition-transform transform bg-black text-white border-r border-gray-700 p-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-[300px] lg:w-[400px] xl:w-[400px]`}
      >
        <div className={`font-bold pb-2 text-xl ${isOpen ? "pt-12" : "pt"}`}>
          Chattko
        </div>
        <Link to="/global_channel">#GlobalChannel</Link>
        <div className="flex flex-col">
          <ul>
            {userList.map((user) => (
              <li key={user.id} className="text-white my-2">
                <AccountCircleIcon className="mr-4" />
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
