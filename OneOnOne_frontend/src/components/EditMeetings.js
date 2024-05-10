import React, { useState } from 'react';
import axios from 'axios';

export const EditMeetings = ({ calendarId }) => { // Accept calendarId as a prop
    const [formData, setFormData] = useState({
        meetingDate: '',
        meetingTime: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (!token) {
                throw new Error('No token found in localStorage');
            }

            const response = await axios.post(`/calendar/${calendarId}/confirm/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Changes saved:', response.data);
            // Optionally, you can handle success here
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className="edit-meetings-container">
            <h3 className="form-title">Edit Meetings</h3>
            <form onSubmit={handleSubmit} className="edit-meetings-form">
                <div className="form-group">
                    <label htmlFor="meetingDate">Meeting Date:</label>
                    <input type="date" id="meetingDate" name="meetingDate" className="form-control" value={formData.meetingDate} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="meetingTime">Meeting Time:</label>
                    <input type="time" id="meetingTime" name="meetingTime" className="form-control" value={formData.meetingTime} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditMeetings;
