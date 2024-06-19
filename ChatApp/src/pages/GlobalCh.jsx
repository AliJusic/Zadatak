import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import SendMessage from "../components/SendMessage";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import io from "socket.io-client";
import Notification from "../components/Notification";

export default function GlobalChannel({ socket }) {
  const [globalMessages, setGlobalMessages] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const isNewUser = localStorage.getItem("isNewUser");

    if (username && password) {
      setUserData({ username, password });
      if (isNewUser === "true") {
        setShowPopup(true);
        localStorage.setItem("isNewUser", false); // Set to false after showing the popup
      }
      setLoading(true);
      fetchGlobalMessages();

      // Emit 'user joined' event when user enters the global channel
      socket.emit("user joined", username);

      // Listen for 'notification' event
      socket.on("notification", (message) => {
        setNotifications((prev) => [...prev, message]);
        setTimeout(() => {
          setNotifications((prev) => prev.slice(1));
        }, 5000); // Remove notification after 5 seconds
      });

      // Listen for 'chat message' event
      socket.on("chat message", (msg) => {
        setGlobalMessages((prevMessages) => [...prevMessages, msg]);
      });

      // Cleanup function to remove event listeners
      return () => {
        socket.off("notification");
        socket.off("chat message");
      };
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchGlobalMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/messages/global",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setGlobalMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching global messages:", error);
      setLoading(false);
    }
  };

  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <React.Fragment>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl text-center max-h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Welcome to Chattko!</h2>
            <p className="mb-2">Your username: {userData.username}</p>
            <p className="mb-4">Your password: {userData.password}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full p-2 bg-gray-700 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex items-center flex-col border-gray-600 border-2 bg-black h-screen">
        <div className="w-full bg-gray-700 text-white text-center p-4">
          #GlobalChannel
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="flex-grow w-full flex flex-col overflow-hidden">
            {globalMessages.length === 0 ? (
              <div className="flex-grow flex items-center justify-center text-white">
                Start conversation
              </div>
            ) : (
              <Chat chat={globalMessages} />
            )}
          </div>
        )}
        <div className="self-end w-full">
          <SendMessage channelID="" socket={socket} />
        </div>
        <Notification
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </div>
    </React.Fragment>
  );
}
