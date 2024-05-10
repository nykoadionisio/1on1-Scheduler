from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import UserSerializer, LoginSerializer, LogoutSerializer, UpdateUserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

import logging
logger = logging.getLogger(__name__)    


class RegisterView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):        
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutView(GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ChangeUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            'name': user.name,
            'email': user.email
        }
        return Response(data)
    def put(self, request):
        user = request.user
        serializer = UpdateUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
# class ProfileView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         logger.debug('ProfileView: Starting to process request')
#         user = request.user
#         serializer = UserSerializer(user)
#         return Response(serializer.data)

#     def put(self, request):
#         user = request.user
#         serializer = UserSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


