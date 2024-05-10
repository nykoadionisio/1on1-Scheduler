import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const InviteForm = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [highPreference, setHighPreference] = useState(false);
    const [lowPreference, setLowPreference] = useState(false);
    const [scheduleOnlyIfNoOtherTimes, setScheduleOnlyIfNoOtherTimes] = useState(false);
    const [calendarId, setCalendarId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); // Current user's data

    useEffect(() => {
        fetchCurrentUser(); // Fetch current user data
        fetchContacts()
            .then(() => {
                console.log('Contacts fetched successfully');
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }, []);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/contacts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/profile/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true,
            });
            setCurrentUser(response.data); // Set the current user's data
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedContact(selectedValue);

        const contactId = Number(selectedValue);
        const selectedContactObj = contacts.find(contact => contact.id === contactId);
        if (selectedContactObj) {
            setContactName(selectedContactObj.name);
            setContactEmail(selectedContactObj.email);
        } else {
            setContactName('');
            setContactEmail('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            // Create a new Calendar instance for the current user
            const calendarResponse = await axios.post(
                'http://localhost:8000/calendar/',
                { name: currentUser.name }, // Use the current user's name
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            const createdCalendarId = calendarResponse.data.id;
            setCalendarId(createdCalendarId);
    
            const confirmationLink = `http://localhost:8000/calendar/${createdCalendarId}/confirm`;
    
            const emailBody = `${currentUser.name} has invited you to join their calendar! Click the link to join:
    ${confirmationLink}
    `;
    
            // Creating the mailto link for the email
            const mailtoLink = `mailto:${contactEmail}?subject=Join my One-on-One Calendar!&body=${encodeURIComponent(emailBody)}`;
    
            window.location.href = mailtoLink;
        } catch (error) {
            console.error('Error creating calendar:', error);
        }
    };

    return (
        <main className="invite-form-container">
            <div className="invite-form">
                <h2 className="form-title">Invite Contacts</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="existingContacts">Select Existing Contact:</label>
                        <select
                            className="form-control"
                            id="existingContacts"
                            value={selectedContact}
                            onChange={handleSelectChange}
                        >
                            <option value="">Choose contact...</option>
                            {contacts.map(contact => (
                                <option key={contact.id} value={contact.id}>{contact.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactName">Contact Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contactName"
                            name="contactName"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactEmail">Contact Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="contactEmail"
                            name="contactEmail"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                        />
                    </div>

                    <h3>Meeting Details</h3>

                    <div className="form-group">
                        <label htmlFor="meetingDate">Meeting Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            id="meetingDate"
                            name="meetingDate"
                            value={meetingDate}
                            onChange={(e) => setMeetingDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="meetingTime">Meeting Time:</label>
                        <input
                            type="time"
                            className="form-control"
                            id="meetingTime"
                            name="meetingTime"
                            value={meetingTime}
                            onChange={(e) => setMeetingTime(e.target.value)}
                            required
                        />
                    </div>

                    <h3>Meeting Preferences</h3>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="highPreference"
                            name="highPreference"
                            checked={highPreference}
                            onChange={() => setHighPreference(!highPreference)}
                        />
                        <label className="form-check-label" htmlFor="highPreference">High Preference</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="lowPreference"
                            name="lowPreference"
                            checked={lowPreference}
                            onChange={() => setLowPreference(!lowPreference)}
                        />
                        <label className="form-check-label" htmlFor="lowPreference">Low Preference</label>
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="scheduleOnlyIfNoOtherTimes"
                            name="scheduleOnlyIfNoOtherTimes"
                            checked={scheduleOnlyIfNoOtherTimes}
                            onChange={() => setScheduleOnlyIfNoOtherTimes(!scheduleOnlyIfNoOtherTimes)}
                        />
                        <label className="form-check-label" htmlFor="scheduleOnlyIfNoOtherTimes">Schedule only if no other times work</label>
                    </div>

                    <button type="submit" className="btn-primary">Send Invitation</button>
                </form>
            </div>
        </main>
    );
};
