from rest_framework import routers

from .views import ChecklistViewSet, ItemViewSet

router = routers.SimpleRouter()
router.register(r'checklists/lists', ChecklistViewSet, 'checklists')
router.register(r'checklists/items', ItemViewSet, 'items')
