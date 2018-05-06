from rest_framework import routers

from .views import ChecklistViewSet

router = routers.SimpleRouter()
router.register(r'checklists', ChecklistViewSet, 'checklists')
