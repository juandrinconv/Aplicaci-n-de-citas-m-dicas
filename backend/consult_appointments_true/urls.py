from django.urls import path
from . import views

urlpatterns = [
    path('consult_appointments_true', views.consult_appointments_true)
]
