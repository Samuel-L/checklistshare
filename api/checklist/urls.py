from rest_framework import routers

from .views import ListViewSet, ItemViewSet

router = routers.SimpleRouter()
router.register(r'checklists/lists', ListViewSet, 'lists')
router.register(r'checklists/items', ItemViewSet, 'items')
