from django.shortcuts import render
from django.template import loader
# Create your views here.

def mainpage(request):
    return render(request, "main.html")

