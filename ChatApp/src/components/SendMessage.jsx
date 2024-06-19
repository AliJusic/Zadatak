import React from "react";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function SendMessage({ channelID, socket }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setIsSending(true);

    try {
      const response = await axios.post(
        "http://localhost:7000/messages/global",
        {
          channelId: "123",
          message: message,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Message sent successfully:", response.data);

      // Clear the input field after sending the message
      socket.emit("chat message", {
        message: message,
        user: {
          name: localStorage.getItem("username"),
        },
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false); // Set to false when the sending process ends
    }
  };
  return (
    <form
      className="border-gray-600 border-2 w-full flex justify-between bg-black text-white rounded-m"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full bg-black text-white outline-none focus:ring-0 focus:outline-none px-2"
        value={message}
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
        disabled={isSending}
      ></input>
      <button type="submit" className="bg-black p-2 disabled={isSending}">
        <SendIcon className=" hover:opacity-25" />
      </button>
    </form>
  );
}
