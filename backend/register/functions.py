from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status

# Function create_user


def validate_user_data(username, email, password, first_name, last_name):
    def empty_fields(username, email, password, first_name, last_name):
        if not username and not email and not password and not first_name and not last_name:
            return {"response": "diligence everything fields"}
        elif not first_name:
            return {"response": "diligence the field first name"}
        elif not last_name:
            return {"response": "diligence the field last name"}
        elif not username:
            return {"response": "diligence the field username"}
        elif not email:
            return {"response": "diligence the field email"}
        elif not password:
            return {"response": "diligence the field password"}
        return None

    def verification_of_existing_parameters(username, email):
        a = User.objects.filter(username=username)
        b = User.objects.filter(email=email)
        if a and b:
            return {"response": "username and email existing"}
        elif a:
            return {"response": "username existing"}
        elif b:
            return {"response": "email existing"}
        return None

    reply = empty_fields(username, email, password, first_name, last_name)
    if reply is not None:
        return Response(reply, status=status.HTTP_400_BAD_REQUEST)
    else:
        pass

    reply = verification_of_existing_parameters(username, email)
    if reply is not None:
        return Response(reply, status=status.HTTP_400_BAD_REQUEST)
    else:
        pass
