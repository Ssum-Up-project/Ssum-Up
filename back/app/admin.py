from django.contrib import admin

from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserChangeForm
from .forms import UserCreationForm
from .models import SearchLog
from .models import User
from .models import PlayList
from .models import VideoData
from .models import Rating


class PlayListInline(admin.TabularInline):
    model = PlayList
    extra = 4


# /admin 페이지에 Custom User 모델 생성/수정 등 가능하게 함.
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ("email", "is_admin")
    list_filter = ("is_admin",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_admin",)}),
    )

    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "password1", "password2")}),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = ()

    inlines = [PlayListInline]


class VideoDataAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["title", "url"]}),
        (
            "다른 정보들 보기",
            {
                "fields": ["summarized_subtitles", "translated_subtitles", "subtitles"],
                "classes": ["collapse"],
            },
        ),
    ]

    inlines = [PlayListInline]


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)

admin.site.register(PlayList)
admin.site.register(VideoData, VideoDataAdmin)
admin.site.register(SearchLog)
admin.site.register(Rating)
