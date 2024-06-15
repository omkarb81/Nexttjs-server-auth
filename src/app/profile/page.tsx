"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout unsuccessful", error.message);
      toast.error("Logout unsuccessful", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-5 text-2xl">
      <h1>Profile page</h1>
      <button
        className="py-2 px-4 bg-black rounded-lg border border-white"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
