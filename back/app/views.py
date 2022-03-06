# Create your views here.
from rest_framework.response import Response
from youtube_transcript_api import YouTubeTranscriptApi

from .permission import IsOwnerOrReadOnly
from .models import PlayList
from .models import VideoData
from .models import User


from rest_framework.views import APIView
from rest_framework import mixins, generics, permissions, viewsets

from django.http import Http404
from rest_framework import status, permissions

from .serializers import PlayListSerializer
from .serializers import (
    VideoDataListSerializer,
    VideoDataPostSerializer,
    VideoDataResponseSerializer,
)
from .serializers import UserSerializer
from .serializers import PlayListPostSerializer

from pytube import YouTube
from .exceptions import AlreadyVideoInPlaylist



class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# 클래스형 뷰 버전
class PlayLists(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_user(self):
        return self.request.user

    def get(self, request):
        """
        플레이리스트(카테고리) 목록
        사용자가 저장한 동영상의 목록을 반환.
        """
        self.user = self.get_user()
        playlist = PlayList.objects.filter(user_id=self.user.id)
        serializer = PlayListSerializer(playlist, many=True)
        return Response(serializer.data)


    def post(self, request, format=None):
        """
        플레이리스트(카테고리) 추가
        플레이리스트(카테고리)에 동영상 추가.
        """
        self.user = self.get_user()

        serializer = PlayListPostSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        # checkExistVideoInPlayList
        if PlayList.objects.filter(
            user_id=self.user.id, list_name=serializer.validated_data["list_name"],
            video_data_id=serializer.validated_data["video_data_id"]
            ).exists():
            raise AlreadyVideoInPlaylist


        serializer.save()
        return Response(PlayListSerializer(serializer.instance).data, status=status.HTTP_201_CREATED)


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
        serializer = VideoDataListSerializer(videodata, many=True)
        return Response(serializer.data)

    # Create
    def post(self, request, format=None):
        """
        유튜브 동영상 데이터 DB에 추가
        """
        # checkExistVideoData
        print('요청url : ', request.data["url"])
        video = VideoData.objects.filter(url=request.data["url"])
        if len(video) > 0:
            print(video[0].url)
            return Response(
                VideoDataResponseSerializer(video[0]).data,
                status=status.HTTP_201_CREATED,
            )
        

        serializer = VideoDataPostSerializer(
            data=request.data, context={"request": request}
        )

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            video_data = serializer.instance
            return Response(
                VideoDataResponseSerializer(video_data).data,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class VideoDataDetail(APIView):
    def get_object(self, pk):
        try:
            return VideoData.objects.get(pk=pk)
        except VideoData.DoesNotExist:
            return Http404

    def get(self, request, pk, format=None):
        videodata = self.get_object(pk)
        serializer = VideoDataResponseSerializer(videodata)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        videodata = self.get_object(pk)
        serializer = VideoDataListSerializer(videodata, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        videodata = self.get_object(pk)
        videodata.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
