"""
URL configuration for the test project.
Include admin and, when they exist, rubbie API URLs.
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path("admin/", admin.site.urls),
    # When rubbie exposes API URLs: path("api/", include("rubbie.api.urls")),
]
