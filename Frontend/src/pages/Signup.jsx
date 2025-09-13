import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email,setEmail]=useState('')
    const [name,setname]=useState('')
    const [password,setPassword]=useState('')
    const [message,setMessage]=useState('');
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
    password:password,
    name:name
   }
    try{
      console.log(data)
     const res=await axios.post("http://localhost:4000/api/auth/register",data);
       localStorage.setItem("user", JSON.stringify(res.data)); 
       localStorage.setItem("token", res.data.token);
      window.location.href = "/upload";
    }catch(err){
        const mess=err.response.data.message
        setMessage(mess)
         
    }
     
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create your{" "}
          <span className="text-blue-600">Career</span>
          <span className="text-green-600">Sense</span> account
        </h2>

        {/* Inputs */}
        <input
          type="text"
          name="name"
          placeholder="Your name"
          onChange={(e)=>setname(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          onChange={(e)=>{setEmail(e.target.value)}}
          autoComplete="off"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e)=>setPassword(e.target.value)}
          autoComplete="new-password" 
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Sign Up Button */}
        <button
         onClick={handleSubmit}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Sign Up
        </button>
    <h1 className="text-red-500 font-bold text-center py-2">{message}</h1>
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
        </button> */}

        {/* <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100"
        >
          <FaFacebook className="text-blue-600 text-lg" />
          Continue with Facebook
        </button> */}

        {/* Footer link */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;