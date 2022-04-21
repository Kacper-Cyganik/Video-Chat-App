from email.policy import HTTP
from random import random
from django.shortcuts import render
from django.http import JsonResponse
from agora_token_builder import RtcTokenBuilder
from django.conf import settings
import random
import time

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
