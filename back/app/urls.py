from django.urls import path, include
from .views import PlayLists, PlayListDetail, VideoDataList, VideoDataDetail, SearchLogList, SearchLogUserList
from rest_framework.urlpatterns import format_suffix_patterns


# 라우팅 버전1 - 라우팅 버전마다 장단점이 있음
urlpatterns = [
    path("playlist/", PlayLists.as_view(), name="playlist_list"),
    path("playlist/<int:pk>/", PlayListDetail.as_view(), name="playlist_detail"),
    path("videodata/", VideoDataList.as_view(), name="videodata_list"),
    path("videodata/<str:pk>/", VideoDataDetail.as_view(), name="videodata_detail"),
    path("searchlog/", SearchLogList.as_view(), name="searchlog"),
    path("searchlog/user", SearchLogUserList.as_view(), name="searchlog_user"),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
