from rest_framework import serializers
from contacts.models.Contact import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email']
        read_only_fields = ['user']

class UpdateContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name']
        read_only_fields = ['user', 'email']