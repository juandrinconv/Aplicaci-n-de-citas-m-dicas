from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from recover_password import serializers
from recover_password import functions


@api_view(['POST'])
def recover_password(request):
    try:
        serializer = serializers.UserSerializer(request.data)
        user_email = User.objects.filter(
            email=serializer.data["email"]).first()
        if user_email == None:
            response = {"response": "the email is not registered"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            new_password = functions.random_password_generator()
            response = functions.send_mail_django(
                serializer.data["email"], new_password)
            user = User.objects.get(email=serializer.data["email"])
            user.set_password(new_password)
            user.save()
            return Response(response, status=status.HTTP_200_OK)
    except Exception:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
