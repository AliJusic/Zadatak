import React from "react";

export default function ChatMessage({ user, message }) {
  const isMyMessage = localStorage.getItem("username") == user ? true : false;
  const messageStyle = isMyMessage
    ? "bg-green-700 m-2 px-4 py-2 rounded-xl flex flex-row w-max"
    : "bg-cyan-900 m-2 px-4 py-2 rounded-xl flex flex-row w-max";
  return (
    <div className={messageStyle}>
      <h1 className="text">{user}~</h1>
      <span className=" text-white">{`${message}`}</span>
    </div>
  );
}
