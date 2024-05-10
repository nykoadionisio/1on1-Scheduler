import React, { useState, useEffect } from 'react';
import axios from 'axios';

// TODO: THE GET REQUEST DOES NOT WORK
export const DashUpcoming = () => {
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);

    useEffect(() => {
        // Fetch upcoming meetings data from the backend
        const fetchUpcomingMeetings = async () => {
            try {
                const response = await axios.get('/calendar/');
                setUpcomingMeetings(response.data);
            } catch (error) {
                console.error('Error fetching upcoming meetings:', error);
            }
        };

        fetchUpcomingMeetings();
    }, []);

    return (
        <div className="col-md-4">
            <h3>Upcoming Meetings</h3>
            <ul>
                {upcomingMeetings.map((meeting, index) => (
                    <li key={index}>{meeting.date} - {meeting.startTime} to {meeting.endTime}</li>
                ))}
            </ul>
        </div>
    );
};
