from django.shortcuts import render

def lobby(request):
    return render(request, 'chat/lobby.html', {})

def room(request):
    return render(request, 'chat/room.html', {})
