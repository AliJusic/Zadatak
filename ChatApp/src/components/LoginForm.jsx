import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFailMessage("");

    if (!formData.name || !formData.password) {
      setFailMessage("Username/password cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/login",
        formData
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("username", response.data.data.user.name);
        localStorage.setItem("password", response.data.data.user.password);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("isNewUser", false);
        setSuccessMessage("Login successful!");
        setFormData({ name: "", password: "" });
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/global_channel");
        }, 500);
      } else {
        console.error("Failed to login:", response.data.message);
        console.log(response);
        setFailMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setFailMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded flex flex-col w-[500px] items-center p-6 py-10 rounded-xl"
      >
        <h1 className="text-center font-bold text-3xl mb-4">Chattko</h1>
        <input
          type="text"
          name="name"
          className="w-full p-2 mb-4 bg-gray-700 text-white"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="w-full p-2 mb-4 bg-gray-700 text-white"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {loading ? (
          <CircularProgress className="" />
        ) : (
          <button
            type="submit"
            className="w-full p-2 bg-gray-700 text-white rounded"
          >
            Login
          </button>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {failMessage && <p className="fail-message">{failMessage}</p>}
        <p className="mt-4 text-center text-black">
          New here?{" "}
          <Link to="/Join" className="text-blue-500">
            Join!
          </Link>
        </p>
      </form>
    </div>
  );
}
