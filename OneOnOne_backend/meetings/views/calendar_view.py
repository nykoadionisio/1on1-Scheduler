from ..models.calendar import Calendar, UserList
from ..serializers.calendarSerializer import CalendarSerializer, UserListSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework import status



class CalendarView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): # Get one calendar given id
        calendar_id = request.query_params.get('id')  # Use query_params instead of data
        calendar = get_object_or_404(Calendar, id=calendar_id)
        serializer = CalendarSerializer(calendar)
        return Response(serializer.data)
    
    def post(self, request): # Create a calendar given name and user (self)
        serializer = CalendarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            userlist = UserList(user=request.user, calendar=Calendar.objects.get(id=serializer.data['id']))
            userlist.save()
            return Response(serializer.data, status=201)

    def delete(self, request): # Delete a calendar given id and all the users that are connected that calendar
        calendar = Calendar.objects.get(id=request.data['id'])
        if calendar is None:
            return Response(status=404)
        userlists = UserList.objects.filter(calendar=calendar)
        for userlist in userlists:
            userlist.delete()
        calendar.delete()
        return Response(status=204)
        
     
class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): # Get all calendars that the user is connected to
        user = request.user
        userLists = UserList.objects.filter(user=user)
        calendars = []
        for userlist in userLists:
            calendars.append(Calendar.objects.get(id=userlist.calendar.id))
        serializer = CalendarSerializer(calendars, many=True)
        return Response(serializer.data)

    def post(self, request): # Connect a user to a calendar
        calendar_id = request.data.get('calendar_id')
        calendar = get_object_or_404(Calendar, id=calendar_id)
        UserList.objects.create(user=request.user, calendar=calendar)
        return Response({'message': 'User joined the calendar'}, status=status.HTTP_201_CREATED)

    def delete(self, request): # Disconnect a user from a calendar
        userlist = UserList.objects.get(user=request.user, calendar=request.data['calendar'])
        userlist.delete()
        return Response(status=204)