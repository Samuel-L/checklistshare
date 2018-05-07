from utils.TestHelpers import DefaultModelTests
from .models import List, Item

class DefaultModelTests(DefaultModelTests):
    fixtures = [ 'list_fixture.json', 'item_fixture.json' ]
    test_objects = [
        { 'model': List, 'string_rep': 'Checklist 1 - 7f44d3f5-0155-48b5-8ffc-53d79dbcc0c2' },
        { 'model': Item, 'string_rep': 'Checklist 1 - Item 1' }
    ]


