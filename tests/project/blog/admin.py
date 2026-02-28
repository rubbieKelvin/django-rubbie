# from django.contrib import admin


# @admin.register(Blog)
# class BlogAdmin(admin.ModelAdmin):
#     list_display = ("title", "slug", "published", "created_at")
#     list_filter = ("published",)
#     prepopulated_fields = {"slug": ("title",)}
#     search_fields = ("title", "body")

from rubbie.dashboard.model import register

from .models import Blog

register(Blog)
