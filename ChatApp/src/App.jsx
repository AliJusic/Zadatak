import React from "react";
import GlobalCh from "./pages/GlobalCh";
import SideBar from "./components/SideBar";
import io from "socket.io-client";

import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
const socket = io("http://localhost:7000");
function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Join" element={<Join />} />
      <Route
        path="global_channel"
        element={
          <div className="flex flex-row h-screen">
            <SideBar socket={socket} />
            <GlobalCh socket={socket} />
          </div>
        }
      />
      <Route path="/" element={<Navigate to="/Join" />} />
    </Routes>
  );
}

export default App;
