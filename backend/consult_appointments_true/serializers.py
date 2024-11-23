from rest_framework import serializers
from django.contrib.auth.models import User


class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]
