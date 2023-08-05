"use client"

import axios from "axios";
import React, { useEffect } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const handleEmailsend = async () => {

        try {
            setLoading(true)
            const response = await axios.post("/api/users/forgotpassword", {email})
            console.log("Email sent successfully", response.data)

        } catch (error: any) {
            console.log("Email sending failed", error.message);

        } finally { 
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <label htmlFor="email"> please input your Email</label>
            <br />
            <h1>{loading ? "Processing" : ""}</h1>
            <br />
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email" />
            <button className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white" onClick={handleEmailsend}>{loading ? "Processing" : "Send"}</button>
        </div>
    )
}