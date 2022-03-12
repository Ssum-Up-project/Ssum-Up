from rest_framework import serializers
from .models import PlayList
from .models import Rating
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
import re
import requests
import json

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ("email", "password")


class PlayListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayList
        video_data_id = serializers.ReadOnlyField(source="videodata.id")
        user_id = serializers.ReadOnlyField(source="user.id")
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


class VideoDataResponseSerializer(serializers.ModelSerializer):
    """단일 동영상 데이터 조회"""

    class Meta:
        model = VideoData
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
        subtitles = self.preprocess(self.getVideoSubtitles(url))


        # 자동 생성 자막 구두점 처리
        params = { "subtitles": subtitles, }
        headers={
        'Referer': 'https://itunes.apple.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
        }

        try:
            # res = requests.post("http://172.21.0.3:5000/api/punct", data=json.dumps(params))
            res = requests.post("http://punctserver:5000/api/punct",headers=headers , data=json.dumps(params), verify=False)
            subtitles_returned = res.text
            print(f'플라스크에서 처리한 구두점 처리 리턴 텍스트: {subtitles_returned}')
        except:
            print("requests.post() Error")
            subtitles_returned = subtitles
        
        # 구두점 처리된 자막 DB에 저장되게 처리
        video_data.subtitles = subtitles_returned
        # 자막 요약하기
        video_data.summarized_subtitles = summarize(subtitles_returned)
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
    
    def preprocess(self, subtitles):
        transcript = self.remove_description_text(subtitles)
        transcript = self.remove_overlap_text(transcript)
        transcript = self.remove_filler_words(transcript)
        return transcript

    def remove_description_text(self, subtitles):
        """ 1. 괄호나 대괄호로 처리된 description 제거
            정규표현식으로 괄호 또는 대괄호 안에 있는 문자열 제거
        """
        parenthesis = "\(.*\)|\s-\s.*"
        bracket = "\[.*\]|\s-\s.*"

        parenthesis_cleaned_subtitle = re.sub(parenthesis,"", subtitles)
        bracket_cleaned_subtitle = re.sub(bracket, "", parenthesis_cleaned_subtitle)
        return bracket_cleaned_subtitle

    def remove_overlap_text(self, subtitles):
        """ 2. 중복단어 반복 제거 """
        splited = subtitles.split()

        repeated_cleaned_subtitle = ""

        for i in range(len(splited) -1) :
            if splited[i] == splited[i+1] :
                pass
            else :
                repeated_cleaned_subtitle += splited[i] + " "

        repeated_cleaned_subtitle += splited[-1]
        return repeated_cleaned_subtitle

    def remove_filler_words(self, subtitles):
        """3. filler words 제거하기 (필러워드 예: 음, 아~)
            - 만들어진 filler words 리스트가 없어서 직접 구글 검색 등을 통해 사용 빈도가 높은 filler words 들을 수집하여 list를 생성함
        """
        # fw_cleaned_test에 클린이 된 text가 할당됨
        fw_list = " i mean | basically | you know | umm | um | uh | huh | er | eh | ah | like that | just | really | somehow | i guess | i suppose | like i said | or something like that | kind of | sort of | you see | see what i mean | yeah "
        fw_cleaned_text = re.sub(fw_list, " ", subtitles)
        return fw_cleaned_text



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
        response['video_data'] = VideoDataBaseSerializer(instance.video_data_id).data
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

class RatingPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["video_data_id", 'rating', "user_id", "created_at"]
        read_only_fields = ("user_id","created_at",)
    
    def create(self, validated_data):
        request = self.context.get("request")        

        rating = Rating()
        rating.user_id = request.user
        rating.video_data_id = validated_data["video_data_id"]
        rating.rating = validated_data["rating"]

        rating.save()

        return rating