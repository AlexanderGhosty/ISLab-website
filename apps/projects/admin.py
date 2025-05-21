from django.contrib import admin

from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ("title", "start_year", "end_year", "sponsor")
    search_fields = ("title", "sponsor")
    list_filter   = ("start_year", "sponsor")