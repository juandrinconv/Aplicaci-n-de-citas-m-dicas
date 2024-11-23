from rest_framework import serializers
from .models import MedicalAppointments


class MedicalAppointmentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = MedicalAppointments
        fields = ["municipality", "specialty", "appointment_date"]
