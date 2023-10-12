"use client"
import React from 'react'
import Navbar from './components/Navbar';
import Link from 'next/link';
import ProtectedRoute from './components/ProtectedRoute';
const Homepage = () => {
  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <div className='bg-image flex flex-col justify-center items-start text-white h-screen p-[50px]'>
          <h1 className="text-[46px] font-bold mb-4">Find The Job That Fits Your Life</h1>
          <p className="text-lg mb-6">Million of people are searching for jobs, salary information, company reviews. Find the one that fits your abilities and potential.</p>
          <Link href="/jobs" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Find Jobs</Link>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Homepage;