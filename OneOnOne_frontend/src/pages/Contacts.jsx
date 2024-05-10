import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddContacts } from '../components/AddContacts';
import { ExistingContacts } from '../components/ExistingContacts';
import {Link} from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8000';

const Contacts = () => {
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
        <div className="container mt-5 mb-5">
            {isLoggedIn ? (
                <>
                    <AddContacts />
                    <ExistingContacts />
                </>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <p>You need to sign in to access your contacts.</p>
                            <Link to="/signin" className="sign-up-link">Sign In</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;
