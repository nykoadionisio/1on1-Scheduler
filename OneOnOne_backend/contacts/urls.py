from django.urls import path
from .views import Contacts, ProfileView

app_name = "contacts"
urlpatterns = [
    path('contacts/' , Contacts.as_view() , name="contacts"),
    path('profile/', ProfileView.as_view(), name='profile'),
]
