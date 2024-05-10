import React, { useState } from 'react';
import axios from 'axios';

export const AddContacts = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Retrieve the token from local storage
            const token = localStorage.getItem('token');
            
            // Include the token in the Authorization header
            const response = await axios.post('/contacts/', {
                name: name,
                email: email,
                phone: phone
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Contact added successfully:', response.data);
            // Optionally, reset form fields after successful submission
            setName('');
            setEmail('');
            setPhone('');
    
            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <main className="contact-container">
            <div className="contact-form">
                <h2 className="form-title">Add Contacts</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="phone">Phone:</label>*/}
                    {/*    <input*/}
                    {/*        type="tel"*/}
                    {/*        className="form-control"*/}
                    {/*        id="phone"*/}
                    {/*        placeholder="Enter phone number"*/}
                    {/*        value={phone}*/}
                    {/*        onChange={(e) => setPhone(e.target.value)}*/}
                    {/*        required*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <button type="submit" className="btn-primary">Add Contact</button>
                </form>
            </div>
        </main>
    );
};