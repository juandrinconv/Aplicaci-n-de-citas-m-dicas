from django.urls import path
from recover_password import views

urlpatterns = [
    path('recover_password', views.recover_password)
]
