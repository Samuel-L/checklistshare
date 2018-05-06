from django.test import TestCase

from .serializers import ChecklistSerializer
from .models import Checklist

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
