import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ExistingContacts = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/contacts/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const deleteContact = async (email) => {
        try {
            // Retrieve the token from local storage
            const token = localStorage.getItem('token');
    
            // Send a DELETE request to /contacts/
            await axios({
                method: 'delete',
                url: '/contacts/',
                data: {
                    email: email
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            // Remove the deleted contact from the state
            setContacts(prevContacts => prevContacts.filter(contact => contact.email !== email));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    
    return (
        <div className="row existing-contacts">
            <div className="col-md-6">
                <h2>Existing Contacts</h2>
                {contacts.length === 0 ? (
                    <p>You have no contacts.</p>
                ) : (
                    <ul className="list-group">
                        {contacts.map((contact, index) => (
                            <li key={contact.id || index} className="list-group-item d-flex justify-content-between align-items-center" style={{border: 'none'}}>
                                <input 
                                    type="text" 
                                    defaultValue={contact.name} 
                                    onBlur={async (e) => { // Set the onBlur event handler directly
                                        try {
                                            const token = localStorage.getItem('token');
                                            await axios.put('/contacts/', {
                                                name: e.target.value,
                                                email: contact.email,
                                            }, {
                                                headers: {
                                                    'Authorization': `Bearer ${token}`
                                                }
                                            });
                                            fetchContacts();
                                        } catch (error) {
                                            console.error('Error updating contact:', error);
                                        }
                                    }}
                                    style={{border: 'none'}}
                                /> ({contact.email})
                                <span className={`badge badge-${contact.availability === 'Available' ? 'success' : 'warning'} availability`}>
                                    {contact.availability}
                                </span>
                                <button className="btn btn-warning" onClick={() => window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(contact.name + ' meeting reminder')}&body=${encodeURIComponent('Please confirm availability.')}`}>Remind</button>
                                <button className="btn btn-danger" onClick={() => deleteContact(contact.email)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};