# Generated by Django 4.1.13 on 2024-10-28 16:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('consult_appointments', '0007_rename_user_medicalappointments_patient'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicalappointments',
            old_name='patient',
            new_name='user',
        ),
    ]
