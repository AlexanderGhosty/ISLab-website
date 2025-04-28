# infosec_lab_app/admin.py
from django.contrib import admin
from .models import News, Publication, Staff, Project

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ("title", "date")
    search_fields = ("title",)
    list_filter = ("date",)

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ("title", "journal")
    search_fields = ("title", "authors", "journal")

@admin.register(Staff)                            # ← NEW
class StaffAdmin(admin.ModelAdmin):
    list_display  = ("name", "position")
    search_fields = ("name", "position")

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ("title", "start_year", "end_year", "sponsor")
    search_fields = ("title", "sponsor")
    list_filter   = ("start_year", "sponsor")