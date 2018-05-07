from rest_framework import viewsets

from .models import List, Item
from .serializers import ListSerializer, ItemSerializer, ChecklistSerializer

class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer 

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ChecklistViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ChecklistSerializer
    lookup_field = 'url'
