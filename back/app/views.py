
# Create your views here.
from rest_framework.response import Response

from .permission import IsOwnerOrReadOnly
from .models import Product
from .models import Post
# 장고제공 유저모델 => 커스텀 유저로 변경 예정
from django.contrib.auth.models import User

# from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import mixins, generics, permissions, viewsets

from django.http import Http404
from rest_framework import status

from .serializers import PostSerializer, ProductSerializer
from .serializers import UserSerializer


class ProductListAPI(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        print(queryset)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permissions_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer


# 함수형 뷰 버전
# @api_view(['GET', 'POST'])
# def PostList(request):
# 	# Read
# 	if request.method == 'GET':
# 		post = Post.objects.all()
# 		serializer = PostSerializer(post, many=True)
# 		return Response(serializer.data)

# 	# Create
# 	elif request.method == 'POST':
# 		serializer = PostSerializer(data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data, status=201)
# 		return Response(serializer.errors, status=404)


# @api_view(['GET', 'PUT', 'DELETE'])
# def PostDetail(request, pk):
# 	try:
# 		post = Post.objects.get(pk=pk)
# 	except Post.DoesNotExist:
# 		return Response(status=status.HTTP_404_NOT_FOUND)

# 	# Detail
# 	if request.method == 'GET':
# 		serializer = PostSerializer(post)
# 		return Response(serializer.data)
# 	elif request.method == 'PUT': # Update
# 		serializer = PostSerializer(post, data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 	#Delete
# 	elif request.method == 'Delete':
# 		post.delete()
# 		return Response(status=status.HTTP_204_NO_CONTENT)


# 클래스형 뷰 버전
# class PostList(APIView):
# 	def get(self, request):
# 		post = Post.objects.all()
# 		serializer = PostSerializer(post, many=True)
# 		return Response(serializer.data)

# 	# Create
# 	def post(self, request, format=None):
# 		serializer = PostSerializer(data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data, status=status.HTTP_201_CREATED)
# 		return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


# class PostDetail(APIView):
# 	def get_object(self, pk):
# 		try:
# 			return Post.objects.get(pk=pk)
# 		except Post.DoesNotExist:
# 			return Http404

# 	def get(self, request, pk, format=None):
# 		post = self.get_object(pk)
# 		serializer = PostSerializer(post)
# 		return Response(serializer.data)
	
# 	def put(self, request, pk, format=None):
# 		post = self.get_object(pk)
# 		serializer = PostSerializer(post, data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(serializer.data)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 	def delete(self, request, pk, format=None):
# 		post = self.get_object(pk)
# 		post.delete()
# 		return Response(status=status.HTTP_204_NO_CONTENT)




# 제네릭 뷰 버전
# class PostList(generics.ListCreateAPIView):
# 	queryset = Post.objects.all()
# 	serializer_class = PostSerializer
# 	permissions_classes = [permissions.IsAuthenticatedOrReadOnly]

# 	def perform_create(self, serializer):
# 		serializer.save(owner=self.request.user)

# class PostDetail(generics.RetrieveUpdateDestroyAPIView):
# 	queryset = Post.objects.all()
# 	serializer_class = PostSerializer
# 	permissions_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# class UserList(generics.ListAPIView):
# 	queryset = User.objects.all()
# 	serializer_class = UserSerializer

# class UserDetail(generics.RetrieveAPIView):
# 	queryset = User.objects.all()
# 	serializer_class = UserSerializer