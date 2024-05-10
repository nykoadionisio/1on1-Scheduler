from .models.Contact import Contact
from .serializers import ContactSerializer, UpdateContactSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

    
class Contacts(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        contacts = Contact.objects.filter(user=request.user)
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ContactSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def delete(self, request):
        contact = Contact.objects.get(email=request.data['email'])
        contact.delete()
        return Response(status=204) 
    
    def put(self, request):
        contact = Contact.objects.get(email=request.data['email'])
        serializer = UpdateContactSerializer(contact, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'name': user.name,
            'email': user.email
        }
        return Response(data)
