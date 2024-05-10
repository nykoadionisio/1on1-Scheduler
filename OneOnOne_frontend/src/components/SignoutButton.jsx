import React from 'react';
import { useUser } from '../contexts/UserContext';

const SignoutButton = () => {
    const { setUser } = useUser();

    const handleSignout = () => {
        // Clear user context
        setUser(null);
        // Clear token from local storage
        localStorage.removeItem('token');
        // Redirect to sign-in page
        window.location.href = '/signin';
    };

    return (
        <div className="text-center"> {/* Center the button */}
            <button onClick={handleSignout} className="btn btn-danger">
                Sign Out
            </button>
        </div>
    );
};

export default SignoutButton;