from re import search
from rest_framework import serializers
from .models import PlayList, VideoData, User, SearchLog


from youtube_transcript_api import YouTubeTranscriptApi
from googletrans import Translator
from pytube import YouTube, extract
from .summarize import summarize


class UserSerializer(serializers.ModelSerializer):
    playlist = serializers.PrimaryKeyRelatedField(
        many=True, queryset=PlayList.objects.all()
    )

    # def create(self, validated_data):
    #     user = User.objects.create_user(
    #         email = validated_data['email'],
    #         password = validated_data['password']
    #     )
    #     return user

    class Meta:
        model = User
        fields = ("email", "password")


class PlayListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayList
        video_data_id = serializers.ReadOnlyField(source="videodata.id")
        user_id = serializers.ReadOnlyField(source="user.id")
        fields = ("id", "list_name", "video_data_id", "user_id")
        # fields = '__all__'


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
        # request = self.context.get("request")

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
        except Exception as e:
            print(e)

        return yt.title

    def getVideoSubtitles(self, url):
        """유튜브링크(url) 받으면 자막을 api로 불러와서 DB에 저장"""

        video_id = extract.video_id(url)
        try:
            srt = YouTubeTranscriptApi.get_transcript(video_id)
        except Exception as e:
            print(e)
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
        searchlog.video_id = validated_data["video_id"]
        searchlog.save()
        return searchlog
