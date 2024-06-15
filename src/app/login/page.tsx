"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading , setloading]=useState(false)

  const onLogin = async () => {
    try {
      setloading(true)
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      console.log("Login success", data);
      toast.success("Login success")
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
    finally{
      setloading(false)
    }
  };

  useEffect(() => {
    if ( user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center flex-col gap-7 min-h-screen">
      <h1 className="text-center text-3xl">{loading?"Processing..":"Login"}</h1>
      
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
          autoComplete="email"
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
          autoComplete="new-password"
        />
      </div>
      <div>
        <button
          className="py-2 px-4 mr-6 bg-black border border-white text-white text-xl rounded-lg font-medium"
          type="button"
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Login" : "Login here"}
        </button>
        <Link href="/signup">Visit signup Here</Link>
      </div>
    </div>
  );
}
