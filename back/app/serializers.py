from re import search
from rest_framework import serializers
from .models import Product
from .models import Post
# 장고 제공 기본 유저 모델 사용 => 커스텀 유저로 변경해야 함
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Product        # product 모델 사용
        fields = '__all__'            # 모든 필드 포함

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User        # product 모델 사용
        # fields = '__all__'            # 모든 필드 포함 
        fields = ('id', 'username', 'email')


class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		owner = serializers.ReadOnlyField(source="owner.username")
		fields = ("id", "title", "content", "owner")
		# fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'post')