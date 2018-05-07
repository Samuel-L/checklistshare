from django.db import models
import uuid

class List(models.Model):
    """
    Model for checklists
    """
    title = models.CharField(max_length=50)
    url = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)

    def __str__(self):
        return f'{self.title} - {self.url}'

class Item(models.Model):
    """
    Model for items
    """
    List = models.ForeignKey(List, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.List.title} - {self.name}'
