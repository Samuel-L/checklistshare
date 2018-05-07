from rest_framework import routers

from .views import ListViewSet, ItemViewSet, ChecklistViewSet

router = routers.SimpleRouter()
router.register(r'checklists/lists', ListViewSet, 'lists')
router.register(r'checklists/items', ItemViewSet, 'items')
router.register(r'checklists/checklist', ChecklistViewSet, 'checklist')
