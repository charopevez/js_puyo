from django.urls import path
from . import views

urlpatterns = [
    path('puyo', views.mainpage),
]
