from rest_framework import serializers

from .models import Checklist, Item

class ChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checklist
        fields = ('id', 'title', 'url')

class ItemSerializer(serializers.ModelSerializer):
    checklist = serializers.ReadOnlyField(source='checklist.title')

    class Meta:
        model = Item
        fields = ('id', 'checklist', 'name')
