from django.urls import path, include
# from .views import PostList, PostDetail, UserDetail, UserList
from .views import PostViewSet, UserViewSet
from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

# 라우팅 버전1 - 라우팅 버전마다 장단점이 있음
# urlpatterns = [
#   path('posts/', PostList.as_view(), name='post_lilst'),
#   path('posts/<int:pk>/', PostDetail.as_view(), name='post_detail'),

#   path('user/', UserList.as_view()),
#   path('user/<int:pk>', UserDetail.as_view()),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)


# 버전2
# post_list = PostViewSet.as_view({'get':'list', 'post':'create'})
# post_detail = PostViewSet.as_view({
#   'get':'retrieve',
#   'put':'update',
#   'patch':'partail_update',
#   'delete':'destroy'
#   })
# user_list = UserViewSet.as_view({'get':'list'})
# user_detail = UserViewSet.as_view({'get':'retrieve'})

# urlpatterns = [
#   path('posts/', post_list, name='post-lilst'),
#   path('posts/<int:pk>/', post_detail, name='post-detail'),

#   path('user/', user_list, name='user-list'),
#   path('user/<int:pk>', user_detail, name='user-detail'),
# ]



# 라우팅 버전3 - 라우팅 버전마다 장단점이 있음
router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [path('', include(router.urls)),]

