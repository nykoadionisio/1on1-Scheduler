from django.db import models
from accounts.models import User
from calendar import Calendar
from ...contacts.models.Contact import Contact

class MeetingSlot(models.Model):
    calendar = models.ForeignKey(Calendar, related_name='meeting_slots', on_delete=models.CASCADE)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    PREFERENCE_CHOICES = [
        (LOW, 'Low Preference'),
        (MEDIUM, 'Medium Preference'),
        (HIGH, 'High Preference'),
    ]
    preference_level = models.CharField(max_length=20, choices=PREFERENCE_CHOICES, default=LOW)

    def __str__(self):
        return f"Meeting Slot for {self.calendar.title}"

class Invitation(models.Model):
    sender = models.ForeignKey(User, related_name='sent_invitations', on_delete=models.CASCADE)
    recipient = models.ForeignKey('Contact', on_delete=models.CASCADE)
    meeting_slot = models.ForeignKey(MeetingSlot, on_delete=models.CASCADE)
    deadline = models.DateTimeField()

    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)

    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    PREFERENCE_CHOICES = [
        (LOW, 'Low Preference'),
        (MEDIUM, 'Medium Preference'),
        (HIGH, 'High Preference'),
    ]
    
    preference_level = models.CharField(max_length=20, choices=PREFERENCE_CHOICES, default=LOW)

    def __str__(self):
        return f"Invitation from {self.sender.username} to {self.recipient.name}"