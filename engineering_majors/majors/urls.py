from django.urls import path
from .views import major_list

urlpatterns = [
    path('majors/', major_list),
]
