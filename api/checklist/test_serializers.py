from django.test import TestCase

from .serializers import ChecklistSerializer, ItemSerializer
from .models import Checklist, Item

class ChecklistSerializerTests(TestCase):
    fixtures = [ 'checklist_fixture.json' ]

    def setUp(self):
        self.checklist = Checklist.objects.get(pk=1)
        self.serializer = ChecklistSerializer(instance=self.checklist)
        self.data = self.serializer.data

    def test_contains_expected_fields(self):
        self.assertEqual(self.data.keys(), set([
            'id', 'title', 'url'    
        ]))

    def test_serializer_fields_content(self):
        self.assertEqual(self.data['title'], self.checklist.title)
        self.assertEqual(self.data['url'], str(self.checklist.url))

class ItemSerializerTests(TestCase):
    fixtures = [ 'checklist_fixture.json', 'item_fixture.json' ]

    def setUp(self):
        self.item = Item.objects.get(pk=1)
        self.serializer = ItemSerializer(instance=self.item)
        self.data = self.serializer.data

    def test_contains_expected_fields(self):
        self.assertEqual(self.data.keys(), set([
            'id', 'checklist', 'name'
        ]))

    def test_serializer_fields_content(self):
        self.assertEqual(self.data['checklist'], self.item.checklist.id)
        self.assertEqual(self.data['name'], self.item.name)
