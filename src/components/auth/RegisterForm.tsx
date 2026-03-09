"use client";

import { useState } from "react";
import { registerUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterForm(){

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = async(e:any)=>{

    e.preventDefault();

    try{

      await registerUser({
        name,
        email,
        password
      });

      router.push("/login");

    }catch(err:any){

      setError(
        err.response?.data?.message || "Registration failed"
      );

    }

  };

  return(

    <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">

      <h2 className="text-2xl md:text-3xl font-semibold text-[#2f3e2f] mb-2">
        Create Account
      </h2>

      <p className="text-gray-500 mb-6 text-sm">
        Start your healthy snacking journey
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2f5d50]"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2f5d50]"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2f5d50]"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          className="w-full bg-[#2f5d50] hover:bg-[#244a40] text-white py-3 rounded-xl font-medium transition shadow-lg"
        >
          Register
        </button>

      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">

        Already have an account?

        <span
          onClick={()=>router.push("/login")}
          className="text-[#2f5d50] font-medium ml-1 cursor-pointer"
        >
          Login
        </span>

      </p>

    </div>

  );

}