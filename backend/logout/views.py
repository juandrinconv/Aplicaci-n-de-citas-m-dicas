from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


@api_view(['POST'])
def Sign_Off(request):
    try:
        auth_header = request.headers.get('Authorization', None)
        if auth_header is not None:
            token_key = auth_header.split(" ")[1]
            token = Token.objects.get(key=token_key)
            token.delete()
            response = Response(
                {"response": "closed session"}, status=status.HTTP_200_OK)
            return response
        else:
            response = Response({"response": "no token was sent"},
                                status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({"response": "invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
