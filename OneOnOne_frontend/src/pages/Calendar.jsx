import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarComp } from '../components/CalendarComp';
import { MeetingsInfo } from '../components/MeetingsInfo';
import { EditMeetings } from '../components/EditMeetings';
import { AvailabilityComp } from '../components/AvailabilityComp';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8000';

const Calendar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedCalendarId, setSelectedCalendarId] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('accounts/change/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setIsLoggedIn(response.data);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkLoginStatus();
    }, []);

    const handleExportCalendar = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found in localStorage');
            }

            if (!selectedCalendarId) {
                throw new Error('No calendar selected');
            }

            const response = await axios.get(`/calendar/${selectedCalendarId}/export/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'calendar_events.csv');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting calendar:', error);
        }
    };

    const handleCalendarSelect = (calendarId) => {
        setSelectedCalendarId(calendarId);
    };

    return (
        <div className="p-4">
            {isLoggedIn ? (
                <>
                    <CalendarComp onCalendarSelect={handleCalendarSelect} />
                    <MeetingsInfo />
                    <AvailabilityComp />
                    <EditMeetings calendarId={selectedCalendarId} /> {/* Pass selectedCalendarId as a prop */}
                    <button className="btn btn-secondary" onClick={handleExportCalendar}>
                        Export to Google Calendar
                    </button>
                </>
            ) : (
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <p>You need to sign in to access the calendar.</p>
                            <Link to="/signin" className="sign-up-link">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
