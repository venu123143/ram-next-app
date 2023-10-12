"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { registerInfo } = useSelector((state: any) => state.auth)
    const [currentUser, setCurrentUser] = useState();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    if (typeof window !== 'undefined') {
        // var currentUser = localStorage.getItem("currentUser")
        var isAuthenticated = localStorage.getItem("currentUser") !== null;
        console.log(isAuthenticated, "is");

    }
    useEffect(() => {
        console.log("use effect");

        if (isAuthenticated) {
            router.push("/");
        }
    }, [ router]);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        const user = registerInfo.find(
            (user: any) => user.email === formData.email && user.password === formData.password
        );
        if (user) {
            if (typeof window !== 'undefined') {
                localStorage.setItem("currentUser", JSON.stringify(user))
            }
            toast.success("Login success")
            router.push("/")
        }
        else {
            toast.error("Invalid credentials")
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-600 text-white">
            <div className="bg-black p-8 rounded-lg shadow-lg">
                <div className='ml-[30px] mb-[30px]'>
                    <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" className='w-[150px] h-[50px]' />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="email">
                            email
                        </label>
                        <input
                            className="w-full px-3 py-2 text-gray-200 bg-black border rounded-lg focus:outline-none focus:border-blue-500"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-500 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 text-gray-200 bg-black border rounded-lg focus:outline-none focus:border-blue-500"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                        type="submit"
                    >
                        Login
                    </button>
                    <Link href="/register"
                        className="w-full text-center mt-3 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                        type="submit"
                    >
                        Sign up
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
