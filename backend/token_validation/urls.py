from django.urls import path
from token_validation import views

urlpatterns = [
    path('token_validation', views.token_validation),
]
