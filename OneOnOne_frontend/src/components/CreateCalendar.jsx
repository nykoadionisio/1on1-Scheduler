import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure this CSS is imported

export const Createcomp = ({ calendarId }) => {
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);

    useEffect(() => {
        // Fetch upcoming meetings data from the backend based on the selected calendar
        const fetchUpcomingMeetings = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!calendarId) return; // Don't fetch if no calendar ID is provided

                const response = await axios.get(`/calendar/${calendarId}/times/`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Assuming you use Bearer token
                    }
                });
                setUpcomingMeetings(response.data);
            } catch (error) {
                console.error('Error fetching upcoming meetings:', error);
            }
        };

        fetchUpcomingMeetings();
    }, [calendarId]); // Fetch when calendar ID changes

    const handleDateChange = (value) => {
        setSelectedDates(value);
        // Additional logic to handle date changes can be implemented here
        // For example, updating the state on your server or managing local component state
    };

    return (
        <div className="calendar-container">
            <div className="calendar-comp">
                <h3 className="calendar-title">Upcoming Meetings</h3>
                <ul className="meeting-list">
                    {upcomingMeetings.map((meeting, index) => (
                        <li key={index} className="meeting-item">
                            {meeting.start_time} - {meeting.end_time}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="availability-calendar">
                <h3>Select Your Availability</h3>
                <Calendar
                    onChange={handleDateChange}
                    selectRange={true}
                    value={selectedDates}
                />
                {selectedDates.length > 0 && (
                    <p>You have selected from {selectedDates[0].toDateString()} to {selectedDates[1].toDateString()}</p>
                )}
            </div>
        </div>
    );
};

export default Createcomp;