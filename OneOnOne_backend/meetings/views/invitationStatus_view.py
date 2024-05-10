from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models.calendar import Calendar, Times, UserList
from ..serializers.calendarSerializer import CalendarSerializer, TimesSerializer

@api_view(['GET'])
def invitation_status(request, calendar_id):
    """
    Retrieve a list of users who have accepted invitations for a specific calendar.
    """
    if request.method == 'GET':
        try:
            # Retrieve users who have accepted invitations for the specified calendar
            accepted_users = UserList.objects.filter(calendar_id=calendar_id)
            accepted_user_ids = accepted_users.values_list('user_id', flat=True)
            return Response({'accepted_user_ids': list(accepted_user_ids)})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)