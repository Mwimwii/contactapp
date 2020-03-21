from django.db import models

# Create your models here.

# Include:
# time started and
# time completed

class Todo(models.Model):
    name = models.CharField(max_length=120)
    number = models.CharField(max_length=12)
    isdone = models.BooleanField(default=False)
    time_started = models.TimeField(null=True)
    time_completed = models.TimeField(null=True)

    def __str__(self):
        return self.name