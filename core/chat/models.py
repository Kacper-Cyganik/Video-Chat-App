from django.db import models

class RoomMember(models.Model):
    name = models.CharField(max_length=255)
    uid = models.CharField(max_length=255)
    room_name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.name
