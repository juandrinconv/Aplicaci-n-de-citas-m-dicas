# Generated by Django 4.1.13 on 2024-10-28 16:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('consult_appointments', '0006_medicalappointments_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicalappointments',
            old_name='user',
            new_name='patient',
        ),
    ]
