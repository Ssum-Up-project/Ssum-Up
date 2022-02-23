
# Create your views here.
from rest_framework.response import Response

from .permission import IsOwnerOrReadOnly
from .models import Product
from .models import Category
from .models import User

from rest_framework.views import APIView
from rest_framework import mixins, generics, permissions, viewsets

from django.http import Http404
from rest_framework import status

from .serializers import CategorySerializer
from .serializers import ProductSerializer
from .serializers import UserSerializer


class ProductListAPI(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        print(queryset)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)


class UserCreate(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer



# 클래스형 뷰 버전
class CategoryList(APIView):
	def get(self, request):
		post = Category.objects.all()
		serializer = CategorySerializer(post, many=True)
		return Response(serializer.data)

	# Create
	def post(self, request, format=None):
		serializer = CategorySerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)



class CategoryDetail(APIView):
	def get_object(self, pk):
		try:
			return Category.objects.get(pk=pk)
		except Category.DoesNotExist:
			return Http404

	def get(self, request, pk, format=None):
		post = self.get_object(pk)
		serializer = CategorySerializer(post)
		return Response(serializer.data)
	
	def put(self, request, pk, format=None):
		post = self.get_object(pk)
		serializer = CategorySerializer(post, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		post = self.get_object(pk)
		post.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)


