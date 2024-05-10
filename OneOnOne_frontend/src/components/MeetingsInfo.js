import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const MeetingsInfo = ({ calendarId }) => {
    const [meetingsInfo, setMeetingsInfo] = useState({
        upcomingMeetings: [],
        unfinalisedMeetings: [],
        meetingIssues: [],
        meetingConflicts: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeetingsInfo = async () => {
            try {
                // Retrieve the token from local storage or your state management
                const token = localStorage.getItem('token');

                if (!token || !calendarId) {
                    console.error('Token or calendarId is missing.');
                    return;
                }

                const response = await axios.get(`/calendar/${calendarId}/times/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMeetingsInfo(response.data);
            } catch (error) {
                console.error('Error fetching meetings info:', error);
                if (error.response && error.response.status === 401) {
                    // Redirect to login or handle reauthentication
                    navigate('/signin');
                }
            }
        };

        if (calendarId) {
            fetchMeetingsInfo();
        }
    }, [calendarId, navigate]);

    return (
        <div className="meetings-info-container">
            <section className="meetings-section">
                <h3>Upcoming Meetings</h3>
                <ul className="meetings-list">
                    {meetingsInfo.upcomingMeetings?.map(meeting => (
                        <li key={meeting.id} className="meeting-item">{meeting.date} - {meeting.time}</li>
                    )) ?? <li>No upcoming meetings</li>}
                </ul>
            </section>

            <section className="meetings-section">
                <h3>Unfinalised Meetings</h3>
                <ul className="meetings-list">
                    {meetingsInfo.unfinalisedMeetings?.map(meeting => (
                        <li key={meeting.id} className="meeting-item">{meeting.date} - {meeting.time}</li>
                    )) ?? <li>No unfinalised meetings</li>}
                </ul>
            </section>

            <section className="meetings-section">
                <h3>Meeting Issues</h3>
                <ul className="meetings-list">
                    {meetingsInfo.meetingIssues?.map(meeting => (
                        <li key={meeting.id} className="meeting-item">{meeting.date} - {meeting.time}</li>
                    )) ?? <li>No meeting issues</li>}
                </ul>
            </section>

            <section className="meetings-section">
                <h3>Meeting Conflicts</h3>
                <ul className="meetings-list">
                    {meetingsInfo.meetingConflicts?.map(meeting => (
                        <li key={meeting.id} className="meeting-item">{meeting.date} - {meeting.time}</li>
                    )) ?? <li>No meeting conflicts</li>}
                </ul>
            </section>
        </div>
    );
};

export default MeetingsInfo;
