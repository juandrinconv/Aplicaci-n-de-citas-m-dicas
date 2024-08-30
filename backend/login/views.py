from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import login as django_login, authenticate
from login import serializers
from django.contrib.auth.models import User


@api_view(['POST'])
def login(request):
    try:
        serializer1 = serializers.User_Serializer(request.data)
        user = authenticate(
            username=serializer1.data["username"], password=serializer1.data["password"])
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            serializer2 = serializers.User_Serializer(instance=user)

            username = serializer2.data["username"]
            consult_user = User.objects.filter(
                username=username).first()
            first_name = consult_user.first_name
            last_name = consult_user.last_name
            user_names = {
                "first_name": first_name,
                'last_name': last_name
            }

            response = Response(
                {"token": token.key, "user_names": user_names, "response": "successful session"}, status=status.HTTP_200_OK)
            return response

        else:
            response = Response(
                {"response": "incorrect ID or password"}, status=status.HTTP_401_UNAUTHORIZED)
            return response

    except:
        return Response({"response": "failed to login"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
