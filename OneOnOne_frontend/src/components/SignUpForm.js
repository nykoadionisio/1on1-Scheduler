import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

export const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/accounts/register/', formData);
            console.log('Registration successful:', response.data);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <main className="signup-container">
            <div className="signup-form">
                <h2 className="form-title">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" name="name"
                               value={formData.name} onChange={handleChange}
                               placeholder="Enter your name"/>
                    </div>
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
                               placeholder="Enter a password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name="password2"
                               value={formData.password2} onChange={handleChange}
                               placeholder="Confirm your password"/>
                    </div>
                    <button type="submit" className="btn-primary">Sign Up</button>
                </form>
            </div>
        </main>
    );
};