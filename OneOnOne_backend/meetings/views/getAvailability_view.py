from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models.calendar import Calendar, Times
from ..serializers.calendarSerializer import TimesSerializer

@api_view(['GET'])
def get_availability(request, user_id, calendar_id):
    """
    Retrieve all times associated with a specific user within a particular calendar (i.e their availability)
    """
    if request.method == 'GET':
        try:
            times = Times.objects.filter(user_id=user_id, calendar_id=calendar_id)
            serializer = TimesSerializer(times, many=True)
            return Response(serializer.data)
        except Times.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)