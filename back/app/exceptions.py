from rest_framework import status
from rest_framework.exceptions import APIException


# 사용자 정의 Exception 클래스 정의
# https://www.django-rest-framework.org/api-guide/exceptions/#apiexception


class DetailDictMixin:
    def __init__(self, detail=None, code=None):
        detail_dict = {"detail": self.default_detail, "code": self.default_code}

        if isinstance(detail, dict):
            detail_dict.update(detail)
        elif detail is not None:
            detail_dict["detail"] = detail

        if code is not None:
            detail_dict["code"] = code

        super().__init__(detail_dict)


# 아래 클래스를 상속받아 에러를 정의해주세요.
class BaseException(DetailDictMixin, APIException):
    pass


class AlreadyVideoInPlaylist(BaseException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "해당 유저의 재생목록(카테고리)에 해당 영상이 저장되있습니다."
    default_code = "AlreadyVideoInPlaylist"


class VideoUnavailableException(BaseException):
  status_code = status.HTTP_400_BAD_REQUEST
  default_detail = "영상을 이용할수 없어 영상의 제목을 얻을수 없습니다(pytube). url 등을 확인해주세요"
  default_code = "VideoUnavailableException"

class NoVideoTitleException(BaseException):
  status_code = status.HTTP_400_BAD_REQUEST
  default_detail = "영상의 제목을 얻을수 없습니다"
  default_code = "NoVideoTitleException"


class NoTranscriptException(BaseException):
  status_code = status.HTTP_400_BAD_REQUEST
  default_detail = "영문 자막이 제공되는 영상이 아닙니다"
  default_code = "NoTranscriptException"

class UnableUtubeTranscriptException(BaseException):
  status_code = status.HTTP_400_BAD_REQUEST
  default_detail = "영문 자막이 제공되는 영상이 아닙니다"
  default_code = "NoTranscriptException"

class AlreadyRatedVideo(BaseException):
    status_code = status.HTTP_406_NOT_ACCEPTABLE
    default_detail = "해당 유저는 이미 평가를 제출했습니다."
    default_code = "AlreadyRatedVideo"