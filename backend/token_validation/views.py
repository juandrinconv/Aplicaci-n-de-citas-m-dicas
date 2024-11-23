from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


@api_view(['GET'])
def token_validation(request):
    auth_header = request.headers.get('Authorization', None)

    if auth_header is not None:
        try:
            token_key = auth_header.split(" ")[1]
            token = Token.objects.get(key=token_key)
            user = token.user
            if user.is_authenticated:
                return Response({"response": "user authenticated"}, status=status.HTTP_200_OK)
            else:
                return Response({"response": "user not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({"response": "invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
