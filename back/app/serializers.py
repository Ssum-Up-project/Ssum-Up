from rest_framework import serializers
from .models import Product
from .models import User

class ProductSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Product        # product 모델 사용
        fields = '__all__'            # 모든 필드 포함

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User        # product 모델 사용
        fields = '__all__'            # 모든 필드 포함 