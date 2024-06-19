import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Join() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateUser = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:7000/api/generateUser");
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("username", data.data.user.name);
        localStorage.setItem("password", data.data.user.password);
        localStorage.setItem("token", data.data.token);
        navigate("/global_channel");
      } else {
        console.error("Failed to generate user:", data.message);
      }
    } catch (error) {
      console.error("Error fetching random user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white rounded p-6 py-10 rounded-xl">
        <h1 className="text-center font-bold text-3xl mb-4">Chattko</h1>
        <button
          onClick={handleGenerateUser}
          className="w-full p-2 bg-gray-700 text-white rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Join"}
        </button>
        <p>
          Already have an account? <Link to="/login">Login Here!</Link>
        </p>
      </div>
    </div>
  );
}
