'use client'
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("nothing")
    const logout = () => {
        try {
            axios.get("/api/users/logout")
            toast.success("Logged out successfully")
            // localStorage.removeItem('token');
            // window.location.reload();

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);


        }

    }
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/myinfo")
        console.log(res.data.data._id)
        setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="text-sky-400 under">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />

            <button type="button" className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}>Logout</button>
            <button type="button" className="bg-orange-500 mt-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={getUserDetails}>Get user details</button>
        </div>
    )
}