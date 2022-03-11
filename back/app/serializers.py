from rest_framework import serializers
from .models import PlayList
from .models import VideoData
from .models import User
from .models import SearchLog
from youtube_transcript_api import YouTubeTranscriptApi
from googletrans import Translator
from pytube import YouTube, extract
from .summarize import summarize
from youtube_transcript_api._errors import NoTranscriptFound
from pytube.exceptions import VideoUnavailable
from .exceptions import NoTranscriptException, NoVideoTitleException, VideoUnavailableException, UnableUtubeTranscriptException


class UserSerializer(serializers.ModelSerializer):
    playlist = serializers.PrimaryKeyRelatedField(
        many=True, queryset=PlayList.objects.all()
    )
    # 문제가 생길수 있는 부분 남겨둠
    
    class Meta:
        model = User
        fields = ("email", "password", "playlist")
    # playlist를 필드에 추가해줌으로서 문제 해결


class PlayListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayList
        video_data_id = serializers.ReadOnlyField(source="videodata.id")
        user_id = serializers.ReadOnlyField(source="user.id")
        # fields = ("id", "list_name", "video_data_id", "user_id")
        fields = '__all__'

class PlayListPostSerializer(serializers.ModelSerializer):
    """
    플레이리스트(카테고리) 생성, 삭제
    """
    class Meta:
        model = PlayList
        fields = ["id", "list_name", "video_data_id", "create_at"]
        extra_kwargs = {"video_data_id": {"write_only": True}}
        read_only_fields = ("created_at",)
    
    def create(self, validated_data):
        request = self.context.get("request")

        playlist = PlayList()
        playlist.list_name = validated_data["list_name"]
        playlist.video_data_id = validated_data["video_data_id"]
        playlist.user_id = request.user

        playlist.save()

        return playlist



class VideoDataListSerializer(serializers.ModelSerializer):
    """동영상 목록 조회"""

    # 역참조 데이터는 코드로 데이터 삽입시 생성가능한데, 포스트맨등으로 테스트시 에러남.
    # playlist = serializers.PrimaryKeyRelatedField(many=True, queryset=PlayList.objects.all())

    class Meta:
        model = VideoData
        fields = ["id", "url", "title", "summarized_subtitles"]


class VideoDataResponseSerializer(serializers.ModelSerializer):
    """단일 동영상 데이터 조회"""

    class Meta:
        model = VideoData
        # fields = ["id", "url", "title", "summarized_subtitles"]
        # read_only_fields = ("created_at",)
        fields = "__all__"


class VideoDataPostSerializer(serializers.ModelSerializer):
    """비디오 데이터 생성"""

    class Meta:
        model = VideoData
        fields = ["id", "url"]

    def create(self, validated_data):
        video_data = VideoData()
        url = validated_data["url"]
        video_data.url = url
        video_data.title = self.getVideoTitle(url)
        video_data.subtitles = self.getVideoSubtitles(url)
        # 자막 요약하기
        video_data.summarized_subtitles = summarize(video_data.subtitles)
        # 요약 자막 번역하기
        video_data.translated_subtitles = Translator().translate(video_data.summarized_subtitles, src='en', dest='ko').text
        video_data.save()

        return video_data

    def getVideoTitle(self, url):
        """ 유튜브 제목 얻기 """
        try:
            yt = YouTube(url)
        except VideoUnavailable as e:
            print(e)
            raise VideoUnavailableException
        except Exception as e:
            print(e)
            raise NoVideoTitleException

        return yt.title

    def getVideoSubtitles(self, url):
        """유튜브링크(url) 받으면 자막을 api로 불러와서 DB에 저장"""

        video_id = extract.video_id(url)
        try:
            srt = YouTubeTranscriptApi.get_transcript(video_id)
        except NoTranscriptFound as e:
            print(e)
            raise NoTranscriptException
        except Exception as e:
            print(e)
            raise UnableUtubeTranscriptException
            
        else:
            subtitles = ""
            for line in srt:
                subtitles += line["text"] + " "

            return subtitles


class SearchLogSerializer(serializers.ModelSerializer):
    """검색로그"""

    class Meta:
        model = SearchLog
        fields = "__all__"
    
    def create(self, validated_data):
        searchlog = SearchLog()
        searchlog.user_id = validated_data["user_id"]
        searchlog.video_data_id = validated_data["video_data_id"]
        searchlog.save()
        return searchlog


class VideoDataBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoData
        fields = ['id', 'url', 'title']

class SearchLogDetailSerializer(serializers.ModelSerializer):
    video_data = VideoDataBaseSerializer(many=True, read_only=True)
    class Meta:
        model = SearchLog
        fields = ['id', 'user_id', 'created_at', 'video_data']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['video_id'] = VideoDataBaseSerializer(instance.video_id).data

        return response

class PlayListDetailSerializer(serializers.ModelSerializer):
    video_data = VideoDataBaseSerializer(many=True, read_only=True)
    class Meta:
        model = PlayList
        fields = ['id', 'user_id', 'create_at', 'list_name', 'video_data']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['video_data'] = VideoDataBaseSerializer(instance.video_data_id).data
        return response