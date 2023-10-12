"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleRegisterDetails } from '../../../redux/features/auth-slice';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const { registerInfo } = useSelector((state: any) => state.auth);
    console.log(registerInfo);
    const [formData, setFormData] = useState({
        name: "",
        image_url: "",
        bio: "",
        email: "",
        password: "",
    });
    if (typeof window !== 'undefined') {

        var isAuthenticated = localStorage.getItem("currentUser") !== null;
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
        dispatch(handleRegisterDetails(formData))
        router.push("/login")
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-600 text-white">
                <div className="bg-black p-8 rounded-lg shadow-lg w-[400px]">
                    <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-500 font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-200 bg-black border rounded-lg focus:outline-none focus:border-blue-500"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-500 font-bold mb-2" htmlFor="image_url">
                                Image URL
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-200 bg-black border rounded-lg focus:outline-none focus:border-blue-500"
                                type="text"
                                id="image_url"
                                name="image_url"
                                placeholder="Enter your image URL"
                                value={formData.image_url}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-500 font-bold mb-2" htmlFor="bio">
                                Bio
                            </label>                          <textarea
                                className="w-full px-3 py-2 text-gray-200 bg-black border rounded-lg focus:outline-none focus:border-blue-500"
                                id="bio"
                                name="bio"
                                rows={4}
                                placeholder="Enter your bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-500 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-200 bg-black border rounded-lg focus:outline-none focus:border-blue-500"
                                type="email"
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
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                            type="submit"

                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
