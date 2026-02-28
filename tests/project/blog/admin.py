from django.contrib import admin

from .models import Blog


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "published", "created_at")
    list_filter = ("published",)
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "body")
