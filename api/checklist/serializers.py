from rest_framework import serializers

from .models import List, Item

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ('id', 'title', 'url')

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'List', 'name', 'seq')

class ChecklistSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = ('id', 'title', 'url', 'items')
