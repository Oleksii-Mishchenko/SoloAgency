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
    Portfolio,
)

User = get_user_model()


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ("id", "title", "content")


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "name", "description", "presentation")


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
        representation["name"] = representation["name"].title()

        request = self.context.get("request", None)
        if request is not None:
            photo_url = instance.photo.url
            representation["photo"] = request.build_absolute_uri(photo_url)

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
            "status",
        )


class EventListDetailSerializer(serializers.ModelSerializer):
    customer = serializers.CharField(source="user.full_name", read_only=True)
    event_type_name = serializers.CharField(source="event_type.name", read_only=True)
    service_name = serializers.CharField(source="service.name", read_only=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "customer",
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
            "status",
        )


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
            "status",
        )


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.first_name", read_only=True)

    class Meta:
        model = Review
        fields = (
            "id",
            "user",
            "user_name",
            "text",
            "rating",
            "created_at",
            "is_approved",
        )
        read_only_fields = ("user",)


class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = (
            "id",
            "title",
            "description",
            "photo",
            "created_at",
        )
