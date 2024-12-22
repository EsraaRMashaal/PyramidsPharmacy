from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MedicationViewSet, RefillRequestViewSet

router = DefaultRouter()
router.register(r'medications', MedicationViewSet)
router.register(r'refill-requests', RefillRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]