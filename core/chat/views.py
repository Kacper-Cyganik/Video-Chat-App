from random import random
from django.shortcuts import render
from django.http import JsonResponse
from agora_token_builder import RtcTokenBuilder
from .models import RoomMember
from django.conf import settings
import random
import time
import json

### CHANGE THAT !! send csrf_token 
from django.views.decorators.csrf import csrf_exempt

def get_token(request):
    #Build token with uid
    app_id = settings.AGORA_APP_ID
    app_certificate = settings.AGORA_APP_CERTIFICATE
    channel_name = request.GET.get('channel')
    uid = random.randint(1,255)
    expiration_time = 3600 * 24 
    current_time_stamp = time.time()
    role=1
    privilageExpiredTs = current_time_stamp + expiration_time

    token = RtcTokenBuilder.buildTokenWithUid(app_id, app_certificate, channel_name, uid, role, privilageExpiredTs)
    return JsonResponse({'token':token, 'uid':uid}, safe=False)

def lobby(request):
    return render(request, 'chat/lobby.html', {})

def room(request):
    return render(request, 'chat/room.html', {})

# @csrf_exempt
def create_member(request):
    data = json.loads(request.body)

    member, created = RoomMember.objects.get_or_create(name=data['name'], uid=data['UID'], room_name=data['room_name'])
    return JsonResponse({'name':data['name']}, safe=False)

def get_member(request):
    uid = request.GET.get('UID')
    room = request.GET.get('room_name')

    member = RoomMember.objects.get(uid=uid, room_name=room)

    name = member.name
    return JsonResponse({'name':member.name}, safe=False)

def delete_member(request):
    data = json.loads(request.body)
    member = RoomMember.objects.get(name=data['name'], uid=data['UID'], room_name=data['room_name'])
    member.delete()
    return JsonResponse('Member deleted', safe=False)