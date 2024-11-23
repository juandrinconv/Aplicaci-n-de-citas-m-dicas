from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .serializers import MedicalAppointmentsSerializers
from consult_appointments.models import MedicalAppointments


@api_view(['POST'])
def assign_appointments(request):
    try:
        auth_header = request.headers.get('Authorization', None)
        if auth_header is not None:
            token_key = auth_header.split(" ")[1]
            token = Token.objects.get(key=token_key)
            user = token.user

            serializer = MedicalAppointmentsSerializers(request.data)
            citaid = serializer.data['id']

            consult_appointment = MedicalAppointments.objects.filter(
                id=citaid).first()
            consult_appointment.user = user
            consult_appointment.available = True
            consult_appointment.save()

            return Response({"response": "assigned appointment"}, status=status.HTTP_200_OK)

    except:
        return Response({"response": "error for assigned appointment"}, status=status.HTTP_401_UNAUTHORIZED)
