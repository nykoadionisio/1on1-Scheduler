from ..models.calendar import Calendar, Times
from ..serializers.calendarSerializer import TimesSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework import status

class MeetingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, calendar_id):
        user = request.user

        times = Times.objects.filter(calendar_id=calendar_id, user=user)
        serializer = TimesSerializer(times, many=True)
        return Response(serializer.data)
        