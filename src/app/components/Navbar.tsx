"use client"
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("currentUser")
        }
        router.push("/login")
    }
    return (
        <div className=" z-50 bg-gray-800 py-4 px-6 fixed top-0 left-0 w-full flex justify-between items-center">
            <div className="flex items-center">
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="logo" className="h-8 mr-4" />
            </div>
            <div className="flex items-center mx-auto">
                <Link href="/" className="text-xl text-gray-300 font-semibold">Home</Link>

                <Link href="/jobs" className="text-xl text-gray-300 font-semibold ml-5">Jobs</Link>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Navbar;