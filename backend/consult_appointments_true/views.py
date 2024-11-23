from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from .serializers import User_Serializer
from consult_appointments.models import MedicalAppointments
from django.contrib.auth.models import User


@api_view(['POST'])
def consult_appointments_true(request):
    try:
        appointments_date = []
        appointments_time = []
        doctor_name = []
        location = []
        appointments_id = []
        specialty = []

        serializer = User_Serializer(request.data)
        username_received = serializer.data['username']

        consult_username = User.objects.filter(
            username=username_received).first()
        username_id = consult_username.id

        consult_appointments = MedicalAppointments.objects.filter(
            user=username_id)

        for i in consult_appointments:
            appointments_date.append(i.appointment_date)
            appointments_time.append(i.appointment_time)
            doctor_name.append(i.doctor_name)
            location.append(i.location)
            appointments_id.append(str(i.id))
            specialty.append(i.specialty)

            return Response({
                'ids': appointments_id,
                'dates': appointments_date,
                'times': appointments_time,
                'specialty': specialty,
                'doctor_names': doctor_name,
                'locations': location
            }, status=status.HTTP_200_OK)

    except:
        return Response({'response': 'No citations associated with the user were found'}, status=status.HTTP_401_UNAUTHORIZED)
