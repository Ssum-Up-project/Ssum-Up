from re import search
from rest_framework import serializers
from .models import PlayList
from .models import VideoData
from .models import User

from youtube_transcript_api import YouTubeTranscriptApi
from pytube import YouTube


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

    # 역참조 데이터는 코드로 데이터 삽입시 생성가능한데, 포스트맨등으로 테스트시 에러남.
    # playlist = serializers.PrimaryKeyRelatedField(many=True, queryset=PlayList.objects.all())

    class Meta:
        model = VideoData
        fields = ["id", "url"]

    def create(self, validated_data):
        # request = self.context.get("request")

        video_data = VideoData()
        url = validated_data["url"]
        video_data.url = url
        self.saveVideoTitle(video_data, url)
        self.saveVideoSubtitles(video_data, url)
        video_data.save()

        return video_data

    def saveVideoSubtitles(self, video_data, url):
        """유튜브링크(url) 받으면 자동생성자막을 api로 긁어와서 DB에 저장"""

        # @todo : 단축 공유 url과 일반 url 둘다 처리 가능하게 수정
        short_link = url.split("/")[-1]
        print(short_link)
        try:
            srt = YouTubeTranscriptApi.get_transcript(short_link)
        except Exception as e:
            result = "링크 에러"
            print(e)
        else:
            subtitles = ""
            for line in srt:
                subtitles += line["text"] + " "
            # request.data["subtitles"] = subtitles
            video_data.subtitles = subtitles

            # 임시로 요약 자막 처리 => ai summary function call로 변경
            video_data.summarized_subtitles = subtitles[:100]

    def saveVideoTitle(self, video_data, url):
        try:
            yt = YouTube(url)
            print(yt.title)
        except Exception as e:
            print(e)

        video_data.title = yt.title
