from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from meetings.models.calendar import UserAvailability
from ..serializers.calendarSerializer import UserAvailabilitySerializer

@api_view(['GET', 'POST'])
def user_availability_list_create(request, user_id):
    """
    List all availability for a user or create a new availability entry.
    """
    if request.method == 'GET':
        availability = UserAvailability.objects.filter(user_id=user_id)
        serializer = UserAvailabilitySerializer(availability, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = UserAvailabilitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
