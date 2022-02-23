from django.urls import path, include
from .views import CategoryList, CategoryDetail
from rest_framework.urlpatterns import format_suffix_patterns


# 라우팅 버전1 - 라우팅 버전마다 장단점이 있음
urlpatterns = [
  path('categories/', CategoryList.as_view(), name='category_lilst'),
  path('categories/<int:pk>/', CategoryDetail.as_view(), name='category_detail'),

  # path('signup/', views.UserCreate.as_view()),
  # path('auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
