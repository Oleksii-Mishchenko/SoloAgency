from django.contrib.auth import get_user_model
from rest_framework import serializers
from agency.models import (
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

User = get_user_model()


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ("id", "title", "content")


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "name", "description")


class AgencySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Agency
        fields = ("id", "name", "services")


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ("id", "name", "description", "photo")

    def to_representation(self, instance):
        representation = super(EventTypeSerializer, self).to_representation(instance)
        representation['name'] = representation['name'].title()
        return representation


class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizer
        fields = (
            "id",
            "description",
            "first_name",
            "last_name",
            "position",
            "phone",
            "email",
            "photo",
        )


class OrganizerListSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Organizer
        fields = (
            "id",
            "description",
            "position",
            "phone",
            "email",
            "full_name",
            "photo",
        )


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            "id",
            "service",
            "description",
            "number_of_guests",
            "event_type",
            "date",
            "style",
            "created_at",
            "city",
            "venue",
            "phone",
        )


class EventListSerializer(serializers.ModelSerializer):
    customer = serializers.CharField(source="user.first_name", read_only=True)
    event_type_name = serializers.CharField(source='event_type.name', read_only=True)
    service_name = serializers.CharField(source='service.name', read_only=True)
    event_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "customer",
            "event_name",
            "service_name",
            "description",
            "number_of_guests",
            "event_type_name",
            "date",
            "style",
            "city",
            "venue",
            "phone",
            "created_at",
        )

    def get_event_name(self, obj):
        return f"{obj.event_type} Customer: {obj.user.first_name}"


class AdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advice
        fields = (
            "id",
            "question",
            "answer",
            "priority",
        )


class CallRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallRequest
        fields = (
            "id",
            "name",
            "description",
            "phone",
            "city",
            "created_at",
        )


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id",
            "user",
            "text",
            "rating",
            "created_at",
            "is_approved",
        )


class ReviewListSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.first_name", read_only=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "user_name",
            "text",
            "rating",
            "created_at",
            "is_approved",
        )
