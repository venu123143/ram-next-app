import React from 'react'
import Navbar from './components/Navbar'

const ErrorPage = () => {
    return (
        <div className='bg-black h-screen flex justify-center items-center'>
            <Navbar/>
            <div className=''>
                <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png " className="w-[450px] h-[400px]" alt='Error-img' />
                <h1 className='text-white font-bold text-center text-4xl mt-5'>Page Not Found</h1>
                <p className='text-white text-center mt-5'>We are sorry, the page you requested could not be found.</p>
            </div>
        </div>
    )
}

export default ErrorPage