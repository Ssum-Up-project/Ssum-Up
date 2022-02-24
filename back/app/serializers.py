from re import search
from rest_framework import serializers
from .models import Product
from .models import VideoList
from .models import VideoData
from .models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product  # product 모델 사용
        fields = "__all__"  # 모든 필드 포함


class VideoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoList
        video_data_id = serializers.ReadOnlyField(source="videodata.id")
        user_id = serializers.ReadOnlyField(source="user.id")
        fields = ("id", "list_name", "video_data_id", "user_id")
        # fields = '__all__'


class VideoDataSerializer(serializers.ModelSerializer):
    # 역참조 데이터는 코드로 데이터 삽입시 생성가능한데, 포스트맨등으로 테스트시 에러남.
    # videolist = serializers.PrimaryKeyRelatedField(many=True, queryset=VideoList.objects.all())

    class Meta:
        model = VideoData
        # fields = ("id", "url", "title", "summarized_subtitles")
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    videolist = serializers.PrimaryKeyRelatedField(many=True, queryset=VideoList.objects.all())

    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         email = validated_data['email'],
    #         password = validated_data['password']
    #     )
    #     return user

    class Meta:
        model = User
        fields = ("email", "password")
