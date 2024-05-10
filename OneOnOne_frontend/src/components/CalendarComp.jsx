import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure this CSS is imported

export const CalendarComp = ({ onCalendarSelect }) => {
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendarId, setSelectedCalendarId] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchCalendars = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found in localStorage');
                }

                const response = await axios.get('/calendar/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCalendars(response.data);
            } catch (error) {
                console.error('Error fetching calendars:', error);
            }
        };

        fetchCalendars();
    }, []); // Fetch calendars when component mounts

    useEffect(() => {
        const fetchEvents = async () => {
            if (!selectedCalendarId) return;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found in localStorage');
                }

                const response = await axios.get(`/calendar/${selectedCalendarId}/times/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Fetched Events:', response.data); // Log fetched events
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [selectedCalendarId]); // Fetch events when selectedCalendarId changes

    const handleCalendarChange = (event) => {
        const selectedCalendarId = event.target.value;
        console.log('Selected Calendar ID:', selectedCalendarId); // Log selected calendar ID
        setSelectedCalendarId(selectedCalendarId); // Update selected calendar ID
        onCalendarSelect(selectedCalendarId); // Notify parent component of selected calendar
    };

    return (
        <div>
            <label>Select Calendar:</label>
            <select onChange={handleCalendarChange} value={selectedCalendarId}>
                <option value="">Select a Calendar</option>
                {calendars.map((calendar) => (
                    <option key={calendar.id} value={calendar.id}>
                        {calendar.name}
                    </option>
                ))}
            </select>

            <div>
                <h2>Events</h2>
                {events.length > 0 ? (
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                {event.start_time} - {event.end_time}
                                {/* You can display other event details as well */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Calendar
                        className="blank-calendar"
                        onChange={() => {}}
                        value={null}
                    />
                )}
            </div>
        </div>
    );
};

export default CalendarComp;
