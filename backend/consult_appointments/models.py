from django.db import models
from django.contrib.auth.models import User


class MedicalAppointments(models.Model):
    municipality = models.CharField(max_length=255, null=False, blank=False)
    specialty = models.CharField(max_length=255, null=False, blank=False)
    appointment_date = models.DateField(null=False, blank=False)
    appointment_time = models.TimeField(null=False, blank=False)
    doctor_name = models.CharField(max_length=255, null=False, blank=False)
    location = models.CharField(max_length=255, null=False, blank=False)
    available = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)

    class Meta:
        db_table = 'MedicalAppointments'

    def __str__(self):
        return str(f"{self.appointment_date}")
