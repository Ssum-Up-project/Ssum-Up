
# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from .models import Product
from .models import User
from rest_framework.views import APIView
from .serializers import ProductSerializer
from .serializers import UserSerializer


class ProductListAPI(APIView):
    def get(self, request):
        queryset = Product.objects.all()
        print(queryset)
        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

class UserListAPI(APIView):
    def get(self, request):
        queryset = User.objects.all()
        print(queryset)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)