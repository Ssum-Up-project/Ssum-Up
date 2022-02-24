from django.urls import path, include
from .views import VideoLists, VideoListDetail, VideoDataList, VideoDataDetail
from rest_framework.urlpatterns import format_suffix_patterns


# 라우팅 버전1 - 라우팅 버전마다 장단점이 있음
urlpatterns = [
    path("videolist/", VideoLists.as_view(), name="videolist_lilst"),
    path("videolist/<int:pk>/", VideoListDetail.as_view(), name="videolist_detail"),
    path("videodata/", VideoDataList.as_view(), name="videodata_lilst"),
    path("videodata/<str:pk>/", VideoDataDetail.as_view(), name="videodata_detail"),
    # path('signup/', views.UserCreate.as_view()),
    # path('auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
