"use client";
import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React,{useState} from "react";

export default function ProfilePage(){
    const router = useRouter()
      const [data, setData] = React.useState("nothing");
    const logout = async() =>{
    try {
        axios.get('/api/users/logout')
        toast.success('Logout successful')
        router.push('/login')
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});

    }
    }

    const getUserDetails = async () => {
      
       const response =  await axios.get('/api/users/me')
       console.log(response.data);
       setData(response.data.data._id)
    }
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className="p-2 mt-1 rounded bg-green-700">
          {data === "nothing" ? (
            "Nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <hr />
        <button
          onClick={logout}
          className="bg-blue-400 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>

        <button
          onClick={logout}
          className="bg-green-400 mt-4 hover:bg-green-200 text-white font-bold py-2 px-4 rounded"
        >
          GetUserDetails
        </button>
      </div>
    );
}