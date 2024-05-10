from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.calendar import Calendar, Times, UserList
from ..serializers.calendarSerializer import CalendarSerializer, TimesSerializer

@api_view(['POST'])
def confirm_calendar(request, calendar_id):
    permission_classes = [IsAuthenticated]
    status_param = request.data.get('status')
    if status_param == 'accept':
        # Find the calendar instance using the provided calendar_id
        calendar = get_object_or_404(Calendar, id=calendar_id)

        # Add any additional validation checks if needed
        
        # Update the calendar status or perform any other actions
        calendar.status = 'confirmed'
        calendar.save()

        return Response({'message': 'User accepted the invitation'}, status=status.HTTP_201_CREATED)
    return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)