from django.test import TestCase

class DefaultModelTests(TestCase):
    """
    This class runs default model tests
    """
    test_objects = None

    def get_object_instance(self, model):
        if model is not None:
            return model.objects.get(pk=1)

    def test_string_representation(self):
        """
        The string representation of the instance should be equal to
        the string_rep variable in models.
        """
        if self.test_objects:
            for test_object in self.test_objects:
                instance = self.get_object_instance(test_object['model'])
                self.assertEqual(str(instance), test_object['string_rep'])
