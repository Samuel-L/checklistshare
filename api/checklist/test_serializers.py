from django.test import TestCase

from .serializers import ListSerializer, ItemSerializer, ChecklistSerializer
from .models import List, Item

class ListSerializerTests(TestCase):
    fixtures = [ 'list_fixture.json' ]

    def setUp(self):
        self.list = List.objects.get(pk=1)
        self.serializer = ListSerializer(instance=self.list)
        self.data = self.serializer.data

    def test_contains_expected_fields(self):
        self.assertEqual(self.data.keys(), set([
            'id', 'title', 'url'    
        ]))

    def test_serializer_fields_content(self):
        self.assertEqual(self.data['title'], self.list.title)
        self.assertEqual(self.data['url'], str(self.list.url))

class ItemSerializerTests(TestCase):
    fixtures = [ 'list_fixture.json', 'item_fixture.json' ]

    def setUp(self):
        self.item = Item.objects.get(pk=1)
        self.serializer = ItemSerializer(instance=self.item)
        self.data = self.serializer.data

    def test_contains_expected_fields(self):
        self.assertEqual(self.data.keys(), set([
            'id', 'List', 'name'
        ]))

    def test_serializer_fields_content(self):
        self.assertEqual(self.data['List'], self.item.List.id)
        self.assertEqual(self.data['name'], self.item.name)

class ChecklistSerializerTests(TestCase):
    fixtures = [ 'list_fixture.json', 'item_fixture.json' ]

    def setUp(self):
        self.list = List.objects.get(pk=1)
        self.serializer = ChecklistSerializer(instance=self.list)
        self.data = self.serializer.data

    def test_contains_expected_fields(self):
        self.assertEqual(self.data.keys(), set([
            'id', 'title', 'url', 'items'
        ]))

    def test_serializer_fields_content(self):
        self.assertEqual(self.data['title'], self.list.title)
        self.assertEqual(self.data['url'], str(self.list.url))
        self.assertEqual(len(self.data['items']), 2)
