from django.http import HttpResponse
from calendar import Calendar, Event
from datetime import datetime
from ..models import calendar

def export_to_google_calendar(request, calendar_id):
    # Check if user is authenticated
    if request.user.is_authenticated:
        # Query CalendarEvent model based on calendar_id
        events = CalendarEvent.objects.filter(calendar_id=calendar_id)

        # Create a new iCalendar instance
        cal = Calendar()

        for event in events:
            # Create a new event component
            cal_event = Event()
            cal_event.add('summary', event.title)
            cal_event.add('dtstart', event.start_time)
            cal_event.add('dtend', event.end_time)
            cal_event.add('description', 'Description of the event')

            # Add the event to the calendar
            cal.add_component(cal_event)

        # Return the iCalendar data as a response
        response = HttpResponse(cal.to_ical(), content_type='text/calendar')
        response['Content-Disposition'] = 'attachment; filename="calendar_events.ics"'
        return response
    else:
        # Handle the case where the user is not authenticated
        # For example, redirect to login page or return an error response
        return HttpResponse("User is not authenticated.")
