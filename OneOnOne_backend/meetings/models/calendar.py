from django.db import models
from accounts.models import User

class Calendar(models.Model):
    name = models.CharField(max_length=255)

class UserList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)

class Times(models.Model):
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class UserAvailability(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    PREFERENCE_CHOICES = [
        (LOW, 'Low Preference'),
        (MEDIUM, 'Medium Preference'),
        (HIGH, 'High Preference'),
    ]
    preference_level = models.CharField(max_length=20, choices=PREFERENCE_CHOICES, default=LOW)