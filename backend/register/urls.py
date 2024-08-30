from django.urls import path
from register import views

urlpatterns = [
    path('create', views.create_user)
]
