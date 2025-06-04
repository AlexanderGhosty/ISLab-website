from django.contrib import admin

from .models import TextBlock


@admin.register(TextBlock)
class TextBlockAdmin(admin.ModelAdmin):
    list_display = ("key",)
    search_fields = ("key",)
