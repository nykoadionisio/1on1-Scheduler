from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models.calendar import Calendar, Times
from ..serializers.calendarSerializer import CalendarSerializer, TimesSerializer

@api_view(['POST'])
def create_times(request, calendar_id):
    permission_classes = [IsAuthenticated]
    calendar = get_object_or_404(Calendar, id=calendar_id)
    serializer = TimesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(calendar=calendar, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)