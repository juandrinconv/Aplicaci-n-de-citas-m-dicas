from django.urls import path
from logout import views

urlpatterns = [
    path('logout', views.Sign_Off),
]
