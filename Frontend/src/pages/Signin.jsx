import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
  const [message,setMessage]=useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      navigate("/upload", { replace: true }); 
    }},[navigate])

  const handleSubmit = async() => {
    const data={
      email:email,
      password:password
    }
    try{
     const res=await axios.post("http://localhost:4000/api/auth/login", data);
    localStorage.setItem("user", JSON.stringify(res.data)); 
    localStorage.setItem("token", res.data.token);
    setEmail("");
    setPassword("");
    window.location.href = "/upload"; 
    
    }catch(err){
        const mess=err.response.data.message
        setMessage(mess)
         
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md relative"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Log in to{" "}
          <span className="text-blue-600">Career</span>
          <span className="text-green-600">Sense</span>
        </h2>

        {/* Email */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
          autoComplete="off" 
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Log In
        </button>
          <h1 className="text-red-500 text-sm text-center py-2">{message}</h1>
        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Buttons */}
        {/* <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md mb-3 hover:bg-gray-100"
        >
          <FcGoogle className="text-lg" />
          Continue with Google
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100"
        >
          <FaFacebook className="text-blue-600 text-lg" />
          Continue with Facebook
        </button> */}

        {/* Footer link */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;