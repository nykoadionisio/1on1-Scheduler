from django.http import JsonResponse
from meetings.models.calendar import UserAvailability
from collections import defaultdict
import itertools

def calculate_overlaps(availabilities):
    # Simplified logic to calculate overlapping times
    overlaps = defaultdict(lambda: defaultdict(int))  # day -> (start_hour, end_hour) -> preference_score
    for day, group in itertools.groupby(availabilities, lambda x: x.day):
        times = list(group)
        for time in times:
            for other_time in times:
                if time != other_time:
                    start_max = max(time.start_hour, other_time.start_hour)
                    end_min = min(time.end_hour, other_time.end_hour)
                    if start_max < end_min:  # They overlap
                        overlap_range = (start_max, end_min)
                        overlaps[day][overlap_range] += 1  # This simplification assumes all preferences are equal
    return overlaps

def suggest_schedules(request, user_id):
    user_availability = UserAvailability.objects.filter(user_id=user_id)
    contacts_availability = UserAvailability.objects.filter(user_id__in=[contact_id for contact_id in request.data['contact_ids']])
    
    all_availabilities = list(user_availability) + list(contacts_availability)
    suggested_overlaps = calculate_overlaps(all_availabilities)
    
    # Convert the overlaps to a more friendly format for the response
    suggested_schedules = [
        {"day": day, "times": [{"start": start, "end": end, "preference_score": score} for (start, end), score in times.items()]}
        for day, times in suggested_overlaps.items()
    ]
    
    return JsonResponse({"suggested_schedules": suggested_schedules})
