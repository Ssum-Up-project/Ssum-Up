# Create your views here.
from rest_framework.response import Response
from youtube_transcript_api import YouTubeTranscriptApi

from .permission import IsOwnerOrReadOnly
from .models import PlayList, VideoData, User, SearchLog


from rest_framework.views import APIView
from rest_framework import mixins, generics, permissions, viewsets

from django.http import Http404
from rest_framework import status

from .serializers import PlayListSerializer
from .serializers import (
    VideoDataListSerializer,
    VideoDataPostSerializer,
    VideoDataResponseSerializer,
    )
from .serializers import SearchLogSerializer
from .serializers import UserSerializer
from drf_yasg.utils import swagger_auto_schema


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# 클래스형 뷰 버전
class PlayLists(APIView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: PlayListSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        }
    )
    def get(self, request):
        '''playlist내 모든 video_id들을 가져옵니다.'''
        playlist = PlayList.objects.all()
        serializer = PlayListSerializer(playlist, many=True)
        return Response(serializer.data)

    # Create
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: PlayListSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        }
    )
    def post(self, request, format=None):
        '''playlist에 원하는 video_id를 저장합니다.'''
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

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: PlayListSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        }
    )
    def get(self, request, pk, format=None):
        '''특정 playlist의 video_id들을 가져옵니다.'''
        playlist = self.get_object(pk)
        serializer = PlayListSerializer(playlist)
        return Response(serializer.data)

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: PlayListSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        }
    )
    def put(self, request, pk, format=None):
        '''playlist의 이름을 수정'''
        playlist = self.get_object(pk)
        serializer = PlayListSerializer(playlist, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: PlayListSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        }
    )
    def delete(self, request, pk, format=None):
        '''playlist내의 비디오 삭제, '''
        playlist = self.get_object(pk)
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VideoDataList(APIView):

    # @swagger_auto_schema(
    #     responses={
    #         status.HTTP_200_OK: VideoDataListSerializer,
    #         status.HTTP_400_BAD_REQUEST: "잘못된 요청",
    #     }
    # )
    # def get(self, request):
    #     videodata = VideoData.objects.all()
    #     serializer = VideoDataListSerializer(videodata, many=True)
    #     return Response(serializer.data) # , status.HTTP_200_OK

    
    @swagger_auto_schema(
        request_body=VideoDataPostSerializer,
        responses={
            status.HTTP_200_OK: VideoDataResponseSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def post(self, request, format=None):
        """유튜브 동영상 데이터 DB에 추가"""
        try:
            request_url = request.data['url']
        except KeyError as e:
            return Response({'KeyError': f'잘못된{e}요청'}, status=status.HTTP_400_BAD_REQUEST)
            
        # checkExistVideoData
        print('요청url : ', request_url)
        video = VideoData.objects.filter(url=request_url)
        if len(video) > 0:
            print(video[0].url)
            return Response(
                VideoDataResponseSerializer(video[0]).data,
                status=status.HTTP_201_CREATED,
            )

        serializer_videodata = VideoDataPostSerializer(
            data=request.data, context={"request": request}
        )

        if serializer_videodata.is_valid(raise_exception=True):
            serializer_videodata.save()
            video_data = serializer_videodata.instance


            if request.user.is_authenticated:
                print(f'current_user : {request.user.id}')
                # save searchlog
                searchlog_input = {"user_id": request.user.id, "video_id": video_data.id}
                serializer_searchlog = SearchLogSerializer(data=searchlog_input)
                if serializer_searchlog.is_valid(raise_exception=True):
                    serializer_searchlog.save()
                    print("save searchlog")
            else:
                print('user is not exist')

            return Response(
                VideoDataResponseSerializer(video_data).data,
                status=status.HTTP_201_CREATED,
            )
        

        return Response(serializer_videodata.errors, status=status.HTTP_404_NOT_FOUND)


class VideoDataDetail(APIView):
    def get_object(self, pk):
        try:
            return VideoData.objects.get(pk=pk)
        except VideoData.DoesNotExist:
            return Http404

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: VideoDataResponseSerializer,
            status.HTTP_400_BAD_REQUEST: "잘못된 요청",
        },
    )
    def get(self, request, pk, format=None):
        '''특정 video_id의 video정보 가져오기'''
        videodata = self.get_object(pk)
        serializer = VideoDataResponseSerializer(videodata)
        return Response(serializer.data)

    # def put(self, request, pk, format=None):
    #     videodata = self.get_object(pk)
    #     serializer = VideoDataListSerializer(videodata, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, pk, format=None):
    #     videodata = self.get_object(pk)
    #     videodata.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


class SearchLogList(APIView):

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: SearchLogSerializer
        }
    )
    def get(self, request, format=None):
        '''모든 사용자의 최근 검색기록 10개'''
        try:
            searchlog = SearchLog.objects.all()[:10]
        except SearchLog.DoesNotExist:
            searchlog = None
        serializer = SearchLogSerializer(searchlog, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SearchLogUserList(APIView):

    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: SearchLogSerializer
        }
    )
    def get(self, request, format=None):
        '''나의 최근 검색기록 가져오기'''
        try:
            searchlog = SearchLog.objects.filter(user_id=request.user.id)
        except SearchLog.DoesNotExist:
            searchlog = None
        serializer = SearchLogSerializer(searchlog, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)