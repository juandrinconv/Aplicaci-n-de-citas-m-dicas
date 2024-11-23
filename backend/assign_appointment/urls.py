from django.urls import path
from . import views

urlpatterns = [
    path('assign_appointments', views.assign_appointments)
]
