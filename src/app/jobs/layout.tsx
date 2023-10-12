"use client"
import React from 'react';
import Navbar from '../components/Navbar';

const LoginLayout = ({ children }: any) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default LoginLayout;
