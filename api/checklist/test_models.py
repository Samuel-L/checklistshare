from utils.TestHelpers import DefaultModelTests
from .models import Checklist

class DefaultModelTests(DefaultModelTests):
    fixtures = [ 'checklist_fixture.json' ]
    test_objects = [
        { 'model': Checklist, 'string_rep': 'Checklist 1' } 
    ]


