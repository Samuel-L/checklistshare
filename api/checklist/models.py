from django.db import models
import uuid

class Checklist(models.Model):
    """
    Model for checklists
    """
    title = models.CharField(max_length=50)
    url = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)

    def __str__(self):
        return f'{self.title} - {self.url}'
