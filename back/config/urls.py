"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from django.urls import re_path

from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
    openapi.Info(
        title="팀4 NaturalFish API 문서(Swagger)",  # 타이틀
        default_version="v1",  # 버전
        description="프로젝트 API 문서입니다.\n기본적으로 /api 이후 아래의 주소로 그에 맞는 요청을 보내시면 값이 반환됩니다.\n입력예시와 출력예시가 간략히 적혀있으니 참고해 주시길 바랍니다.\n현재 rest-auth 에서 username은 특별히 입력하지 않으셔도 됩니다.\n현재 토큰방식으로 인증을 진행하고있으며, 일부 기능들은 받은 토큰을 header에 담아서 요청을 보내셔야 합니다.\nex) `Authorization: Token [받으신 token_key]`",  # 설명
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="서버 관리자 이메일"),
        license=openapi.License(name="Elice AI 3rd - AI Team4 License"),
    ),
    public=True,
    permission_classes=(AllowAny,),
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("app.urls")),
    path("api/rest-auth/", include("rest_auth.urls")),
    path("api/rest-auth/registration/", include("rest_auth.registration.urls")),
    re_path(
        r"swagger(?P<format>\.json|\.yaml)",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
