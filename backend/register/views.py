from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from register import functions
from register import serializers


@api_view(['POST'])
def create_user(request):
    try:
        serializer = serializers.UserSerializer(request.data)
        response = functions.validate_user_data(
            serializer.data["username"], serializer.data["email"], serializer.data["password"], serializer.data["first_name"], serializer.data["last_name"])

        if response is not None:
            return response
        else:
            user_new = User(username=serializer.data["username"],
                            email=serializer.data["email"],
                            password=serializer.data["password"],
                            first_name=serializer.data["first_name"],
                            last_name=serializer.data["last_name"]
                            )
            user_new.set_password(serializer.data["password"])
            user_new.save()
            return Response({"response": "successful registration", "user": serializer.data}, status=status.HTTP_201_CREATED)
    except Exception:
        return Response({"response": "error registering user"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
