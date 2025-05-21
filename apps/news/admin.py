from django.contrib import admin

from .models import NewsImage, News


class NewsImageInline(admin.TabularInline):
    model = NewsImage
    extra = 1
    max_num = 20


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("title", "date")
    inlines = (NewsImageInline,)
    search_fields = ("title",)
    list_filter = ("date",)
