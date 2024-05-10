import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InviteForm } from '../components/InviteForm';
import {Link} from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8000';

const Invite = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Retrieve the token from wherever it's stored
                const token = localStorage.getItem('token');

                // Log the retrieved token for debugging
                console.log(`Retrieved token: ${token}`);

                // Include the token in the headers of your request
                const response = await axios.get('accounts/change/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true,
                });
                console.log('Fetched profile data:', response.data);
                setIsLoggedIn(true); // Set isLoggedIn to true if user is logged in
            } catch (error) {
                setIsLoggedIn(false); // Set isLoggedIn to false if there's an error (user is not logged in)
            }
        };
        checkLoginStatus();
    }, []);


    return (
        <div>
            {isLoggedIn ? (
                <InviteForm />
            ) : (
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <p>You need to sign in to access this feature.</p>
                            <Link to="/signin" className="sign-up-link">Sign In</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invite;
