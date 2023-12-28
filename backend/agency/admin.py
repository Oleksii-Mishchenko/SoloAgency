from django.contrib import admin
from .models import Service, Agency, EventType, Organizer, Event, Advice, Review, CallRequest


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(Agency)
class AgencyAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    filter_horizontal = ("services",)


@admin.register(EventType)
class EventTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(Organizer)
class OrganizerAdmin(admin.ModelAdmin):
    list_display = ("full_name", "position", "phone", "email", "photo")
    search_fields = ("first_name", "last_name", "position", "phone", "email")


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "event_type", "date", "style", "user", "created_at")
    filter_horizontal = ("organizers",)


@admin.register(Advice)
class AdviceAdmin(admin.ModelAdmin):
    list_display = ("question", "answer")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("user", "text", "rating", "created_at", "updated_at", "is_approved")
    list_filter = ("is_approved",)
    search_fields = ("user__username", "text")

@admin.register(CallRequest)
class CallRequestAdmin(admin.ModelAdmin):
    list_display = ('name', "description", 'phone', 'created_at')
