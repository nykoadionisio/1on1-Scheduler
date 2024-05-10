import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:8000';

export const ProfileView = () => {
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
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
                setProfileData(response.data);
                // Populate form fields with current user data
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    password: ''
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('accounts/change/', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true,
            });
            console.log('Profile update successful:', response.data);
            // Update profileData with the updated data
            setProfileData(response.data);
            // Exit editing mode
            setEditing(false);
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    return (
        <main className="profile-container">
            <div>
                <div className="row">
                    {profileData ? (
                        <div className="profile-form">
                            <h2 className="form-title">Personal Information</h2>
                            {editing ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" name="name"
                                            value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" className="form-control" id="email" name="email"
                                            value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" name="password"
                                            value={formData.password} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </form>
                            ) : (
                                <>
                                    <p>Name: {profileData.name}</p>
                                    <p>Email: {profileData.email}</p>
                                    <button className="btn btn-secondary" onClick={() => setEditing(true)}>Change Details</button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="col-md-12 text-center">
                            <p>You need to sign in to view your profile.</p>
                            <Link to="/signin" className="sign-up-link">Sign In</Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};
