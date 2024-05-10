import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

export const SigninForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { setUser } = useUser();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/accounts/login/', formData);
            console.log('Login successful:', response.data);
            // Update user context with the logged in user's details

            setUser({ email: formData.email });
            console.log("User set in context:", formData.email);
            // Store token in local storage
            localStorage.setItem('token', response.data.access_token);
            // Redirect to profile page
            window.location.href = '/profile';
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : 'Unknown error');
            setError('Invalid email or password. Please sign up if you do not have an account.');
        }
    };

    return (
        <main className="signin-container">
            <div className="signin-form">
                <h2 className="form-title">Sign In</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" className="form-control" id="email" name="email"
                               value={formData.email} onChange={handleChange}
                               placeholder="Enter your email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password"
                               value={formData.password} onChange={handleChange}
                               placeholder="Enter your password"/>
                    </div>
                    <button type="submit" className="btn-primary">Sign In</button>
                </form>
                <p className="mt-3">Don't have an account? <a href="/signup" className="signup-link">Sign up</a></p>
            </div>
        </main>
    );
};

