"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading , setloading]= useState(false)

  const onSignup = async () => {
    try {
      setloading(true)
      const response = await axios.post("/api/user/signup", user);
      console.log(response.data);
      router.push("/login");

      
    } catch (error: any) {
      console.log("SignUp failed", error.message);
      toast.error(error.message);
    }
    finally{
      setloading(false)
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center flex-col gap-7 min-h-screen">
      <h1 className="text-center text-3xl">{loading?"Processing..":"SignUp"}</h1>
      <div>
        <label htmlFor="username" className="text-2xl">
          Username
        </label>
        <input
          className="p-2 rounded-lg border border-gray-300 ml-2 text-black font-medium"
          type="text"
          placeholder="username"
          value={user.username}
          id="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email" className="text-2xl">
          Email
        </label>
        <input
          className="p-2 rounded-lg border border-gray-300 ml-2 text-black font-medium"
          type="email"
          placeholder="email"
          value={user.email}
          id="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="password" className="text-2xl">
          Password
        </label>
        <input
          className="p-2 rounded-lg border border-gray-300 ml-2 text-black font-medium"
          type="password"
          placeholder="password"
          value={user.password}
          id="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div>
        <button
          className="py-2 px-4 mr-6 bg-black border border-white text-white text-xl rounded-lg font-medium"
          type="button"
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Signup" : "SignUp here"}
        </button>
        <Link href="/login">Visit Login Here</Link>
      </div>
    </div>
  );
}
