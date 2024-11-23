from rest_framework import serializers
from consult_appointments.models import MedicalAppointments


class MedicalAppointmentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = MedicalAppointments
        fields = ["id"]
