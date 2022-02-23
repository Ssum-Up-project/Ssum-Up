from re import search
from rest_framework import serializers
from .models import Product
from .models import Category
from .models import User

class ProductSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Product        # product 모델 사용
        fields = '__all__'            # 모든 필드 포함


class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		user = serializers.ReadOnlyField(source="user.id")
		fields = ("id", "name", "content", "user")
		# fields = '__all__'



class UserSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())

    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         email = validated_data['email'],
    #         password = validated_data['password']
    #     )
    #     return user
    
    class Meta:
        model = User
        fields = ('email', 'password')