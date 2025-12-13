'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

// Assuming you have shared Firebase instances
import { auth } from '@/app/firebase/config';

// --- SHAMI GLOBAL SHOP THEME CONFIGURATION ---
const BODY_BG = 'bg-[#f0f2f5]'; // Consistent light background
const PRIMARY_TEXT_COLOR = 'text-gray-800'; // Dark text for loading message

export default function AuthRedirector() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Ensure auth object is available before attempting to subscribe
        if (!auth) {
            console.error('Firebase Auth is not initialized.');
            // Fail fast or redirect to a default error page
            router.push('/auth?mode=login');
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // If user is authenticated, they are a seller, redirect to dashboard
                // Note: Real-world apps should verify the user's 'seller' status in Firestore here.
                router.push('/seller');
            } else {
                // If not authenticated, redirect to login page
                router.push('/auth?mode=login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            // Apply consistent background and text color to the loading screen
            <div className={`flex items-center justify-center min-h-screen ${BODY_BG} ${PRIMARY_TEXT_COLOR} text-lg font-medium`}>
                Redirecting... Please wait.
            </div>
        );
    }

    return null;
}