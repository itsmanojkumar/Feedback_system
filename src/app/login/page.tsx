'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Login() {
    const router = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
           
            const response = await fetch("https://backend-server-feedback.onrender.com/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });

            const contentType = response.headers.get("content-type");

            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error("Unexpected response:", text);
                throw new Error("Response not JSON");
            }

            if (response.ok) {
                const { role } = data;

                // Store role and username
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", role);

                // Redirect based on role
                if (role === "manager") {
                    router.push('/dashboard');
                } else if (role === "employee") {
                    router.push('/employee');
                } else {
                    alert("Login succeeded, but role is unknown.");
                }

                // Clear fields after redirect trigger
                setUsername("");
                setPassword("");
            } else {
                alert("Login failed: " + (data.detail || "Unknown error"));
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <p>username:manager1</p>
            <p>password:pass123</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                    >
                        Submit
                    </button>
                </form>
                <p>for employee<p>username:username given by manager</p>
                <p>(usernamegivenby)123</p>
                </p>
            </div>
        </div>
        
    )
}

export default Login;
