"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: any) => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const currentUser = localStorage.getItem("currentUser");
            const isAuthenticated = currentUser !== null;

            if (!isAuthenticated) {
                router.push('/login');
            }
        }
    }, [router]);

    return children;
};

export default ProtectedRoute;
