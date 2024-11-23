from django.urls import path
from . import views

urlpatterns = [
    path('consult_appointments', views.consult_appointments)
]
