from rest_framework import serializers
from ..models.calendar import Calendar, Times, UserList, UserAvailability

class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['id', 'name']

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserList
        fields = ['id', 'user', 'calendar']

class TimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Times
        fields = ['id', 'calendar', 'user', 'start_time', 'end_time']

class UserAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAvailability
        fields = '__all__'