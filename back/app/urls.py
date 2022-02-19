from django.urls import path, include
from .views import PostViewSet, UserViewSet
from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

# 여러 라우팅 방식마다 장단점이 있음
router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [path('', include(router.urls)),]

