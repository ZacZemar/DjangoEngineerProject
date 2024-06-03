from django.http import JsonResponse, HttpResponse
from .models import Major

def major_list(request):
    majors = Major.objects.all().values()
    return JsonResponse(list(majors), safe=False)

def home(request):
    return HttpResponse("Hello, this is the home page!")
