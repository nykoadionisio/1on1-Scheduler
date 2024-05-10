import React from 'react';
import { useUser } from '../contexts/UserContext';

export const Header = () => {
    const { user } = useUser();
    console.log("User in header:", user);

    return (
        <header className="header-container">
            <h1 className="header-title">1on1</h1>
            <h2 className="header-subtitle">Schedule Your 1:1 Meetings</h2>
            {/* Conditionally render the user's email if they are logged in */}
            {user && <div className="user-email">{user.email}</div>}
        </header>
    );
};