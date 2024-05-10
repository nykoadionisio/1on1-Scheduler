from django.urls import path
from .views.confirmCalendar_view import confirm_calendar
from .views.createTimes_view import create_times
from .views.calendar_view import CalendarView, UserListView
from .views.getAvailability_view import get_availability
from .views.invitationStatus_view import invitation_status
from .views.user_availability_view import user_availability_list_create
from .views.exportMeetings_view import export_to_google_calendar
from .views.getMeetings_view import MeetingView
 
urlpatterns = [
    path('calendar/times/create/<int:calendar_id>/', create_times),
    path('calendar/<int:calendar_id>/confirm/', confirm_calendar),
    path('calendar/', CalendarView.as_view()),
    path('calendar/user/', UserListView.as_view()),
    path('calendar/<int:calendar_id>/times/availability/<int:user_id>/', get_availability),
    path('calendar/<int:calendar_id>/accepted_users/', invitation_status),
    path('calendar/<int:calendar_id>/export/', export_to_google_calendar), 
    path('users/<int:user_id>/availability/', user_availability_list_create, name='user-availability-list-create'),
    path('calendar/<int:calendar_id>/times/', MeetingView.as_view()),
]
