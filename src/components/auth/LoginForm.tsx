"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleSubmit = async(e:any)=>{

    e.preventDefault();

    try{

      await loginUser({
        email,
        password
      });

      router.push("/");

    }catch{

      setError("Invalid email or password");

    }

  };

  return (

    <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">

      <h2 className="text-2xl md:text-3xl font-semibold text-[#2f3e2f] mb-2">
        Welcome Back
      </h2>

      <p className="text-gray-500 mb-6 text-sm">
        Login to continue your healthy snacking journey
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

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
          Login
        </button>

      </form>


      {/* divider */}

      <div className="flex items-center gap-4 my-6">

        <div className="h-px bg-gray-200 flex-1"/>

        <span className="text-sm text-gray-400">
          OR
        </span>

        <div className="h-px bg-gray-200 flex-1"/>

      </div>


      {/* Google login */}

      <button
        className="w-full border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition"
      >
        Continue with Google
      </button>


      <p className="text-sm text-gray-500 mt-6 text-center">

        Don’t have an account?

        <span className="text-[#2f5d50] font-medium ml-1 cursor-pointer"
        onClick={()=>router.push("/register")}>
          Sign up
        </span>

      </p>

    </div>

  );

}