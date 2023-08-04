'use client'

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setverified] = useState(false)
    const [error, setError] = useState(false);


    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setverified(true);

        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || '');
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center 
        justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="bg-sky-700 text-black text-3xl p-2">{token ? `${token}` : "No Token"}</h2>
            {verified && (
                <div>
                    <h2 className="text-2xl text-lime-600">Email verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-3xl bg-red-500">Error</h2>
                </div>
            )}
        </div>
    )
}