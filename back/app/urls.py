from django.urls import path
from .views import PlayLists
from .views import PlayListDetail
from .views import VideoDataList
from .views import VideoDataDetail
from .views import SearchLogList
from .views import SearchLogUserList
from .views import RatingDetail


urlpatterns = [
    path("playlist/", PlayLists.as_view(), name="playlist_list"),
    path("playlist/<int:pk>/", PlayListDetail.as_view(), name="playlist_detail"),
    path("videodata/", VideoDataList.as_view(), name="videodata_list"),
    path("videodata/<str:pk>/", VideoDataDetail.as_view(), name="videodata_detail"),
    path("searchlog/", SearchLogList.as_view(), name="searchlog"),
    path("searchlog/user/", SearchLogUserList.as_view(), name="searchlog_user"),
    path("rating/", RatingDetail.as_view(), name="rating"),
]