from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .serializers import MedicalAppointmentsSerializers
from rest_framework import status
from .models import MedicalAppointments
from rest_framework.response import Response
from datetime import datetime


@api_view(['POST'])
def consult_appointments(request):
    try:
        appointments_date = []
        appointments_time = []
        doctor_name = []
        location = []
        appointments_id = []

        serializer = MedicalAppointmentsSerializers(request.data)
        municipality = serializer.data['municipality']
        specialty = serializer.data['specialty']
        recived_date_string = serializer.data['appointment_date']

        recived_date = datetime.strptime(
            recived_date_string, '%Y-%m-%d').date()
        current_date = datetime.now().date()

        if recived_date == current_date:
            consult_date = MedicalAppointments.objects.filter(
                available__in=[False], municipality=municipality, specialty=specialty)

            for i in consult_date:
                appointments_date.append(i.appointment_date)
                appointments_time.append(i.appointment_time)
                doctor_name.append(i.doctor_name)
                location.append(i.location)
                appointments_id.append(str(i.id))

            return Response({
                'ids': appointments_id,
                'dates': appointments_date,
                'times': appointments_time,
                'doctor_names': doctor_name,
                'locations': location
            }, status=status.HTTP_200_OK)

    except:
        return Response({'response': 'select a valid date'}, status=status.HTTP_401_UNAUTHORIZED)
