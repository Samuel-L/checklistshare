from utils.TestHelpers import DefaultModelTests
from .models import Checklist

class DefaultModelTests(DefaultModelTests):
    fixtures = [ 'checklist_fixture.json' ]
    test_objects = [
        { 'model': Checklist, 'string_rep': 'Checklist 1 - 7f44d3f5-0155-48b5-8ffc-53d79dbcc0c2' } 
    ]


