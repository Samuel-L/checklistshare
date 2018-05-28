from rest_framework import viewsets, mixins

from .models import List, Item
from .serializers import ListSerializer, ItemSerializer, ChecklistSerializer

class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer 

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ChecklistViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = List.objects.all()
    serializer_class = ChecklistSerializer
    lookup_field = 'url'
