"use client"

import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || '');
  }, []);

  const handleResetPassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError(true);
      return;
    }
    const requestData = {
      token,
      newPassword: passwords.newPassword,
      confirmPassword: passwords.confirmPassword
    };

    try {
      setLoading(true);

      if (token.length > 0) {
        const response = await axios.post("/api/users/resetpassword",requestData);
        console.log("Password was changed successfully", response.data);
      } else {
        setError(true);
        console.log(requestData);
        console.log("Token is invalid");
      }
    } catch (error:any) {
      setError(true);
      console.log("Password changing failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="email">Reset Password</label>
      <div className="flex flex-row">
        <h1 className="text-2xl px-2">New password</h1>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="new password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          placeholder="New Password"
        />
      </div>
      <div className="flex flex-row">
        <h1 className="text-2xl px-2">Confirm Password</h1>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="confirm password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
          placeholder="Confirm Password"
        />
      </div>
      {error && <p className="text-red-500">Passwords do not match</p>}
      <button
        className="p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        onClick={handleResetPassword}
        disabled={loading}
      >
        {loading ? "Processing" : "Change Password"}
      </button>
    </div>
  );
}
