from django.contrib import admin
from .models import (
    Service,
    Agency,
    EventType,
    Organizer,
    Event,
    Advice,
    Review,
    CallRequest,
    Article,
)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(Organizer)
class OrganizerAdmin(admin.ModelAdmin):
    list_display = ("full_name", "position", "phone", "email", "photo")
    search_fields = ("first_name", "last_name", "position", "phone", "email")


@admin.register(Advice)
class AdviceAdmin(admin.ModelAdmin):
    list_display = ("question", "answer")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("user", "text", "rating", "created_at", "is_approved")
    list_filter = ("is_approved",)
    search_fields = ("user__username", "text")


admin.site.register(CallRequest)
admin.site.register(Event)
admin.site.register(Article)
admin.site.register(Agency)
