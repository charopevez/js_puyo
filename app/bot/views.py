from django.shortcuts import render
from django.http import JsonResponse
import random
# Create your views here.

def mainpage(request):
    return JsonResponse({
            "horizontal": random.randint(0, 5)-2,
            "rotation": random.randint(0, 3),
            "fall": 0})