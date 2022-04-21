
from django.urls import path
from . import views

urlpatterns = [
    path('', views.lobby, name='lobby'),
    path('room/', views.room, name='room'),
    path('get_token/', views.get_token, name='get-token'),
    path('create_member/', views.create_member, name='create-member'),
    path('get_member/', views.get_member, name='get-member'),
    path('delete_member/', views.delete_member, name='delete-member'),
]
