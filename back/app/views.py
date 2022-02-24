# Create your views here.
from rest_framework.response import Response

from .permission import IsOwnerOrReadOnly
from .models import Product
from .models import PlayList
from .models import VideoData
from .models import User


from rest_framework.views import APIView
from rest_framework import mixins, generics, permissions, viewsets

from django.http import Http404
from rest_framework import status

from .serializers import PlayListSerializer
from .serializers import VideoDataSerializer
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
class PlayLists(APIView):
    def get(self, request):
        playlist = PlayList.objects.all()
        serializer = PlayListSerializer(playlist, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, format=None):
        serializer = PlayListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class PlayListDetail(APIView):
    def get_object(self, pk):
        try:
            return PlayList.objects.get(pk=pk)
        except PlayList.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        playlist = self.get_object(pk)
        serializer = PlayListSerializer(playlist)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        playlist = self.get_object(pk)
        serializer = PlayListSerializer(playlist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        playlist = self.get_object(pk)
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VideoDataList(APIView):
    def get(self, request):
        videodata = VideoData.objects.all()
        serializer = VideoDataSerializer(videodata, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, format=None):
        serializer = VideoDataSerializer(data=request.data)
        # 유튜브링크(url) 받으면 자동생성자막을 api로 긁어와서 DB에 넣게 하는 부분 적용 할것

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class VideoDataDetail(APIView):
    def get_object(self, pk):
        try:
            return VideoData.objects.get(pk=pk)
        except VideoData.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        videodata = self.get_object(pk)
        serializer = VideoDataSerializer(videodata)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        videodata = self.get_object(pk)
        serializer = VideoDataSerializer(videodata, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        videodata = self.get_object(pk)
        videodata.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
