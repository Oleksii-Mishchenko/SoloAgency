from rest_framework import serializers
from agency.models import Service, Agency, EventType, Organizer, Event, Advice, Review


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "name", "description")


class AgencySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Agency
        fields = ("id", "name", "description", "agency_values", "services")


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ("id", "name", "description")


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
            "full_name",
        )


class EventSerializer(serializers.ModelSerializer):
    organizers = OrganizerSerializer(many=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "organizers",
            "description",
            "name",
            "number_of_guests",
            "event_type",
            "date",
            "style",
            "user",
            "created_at",
        )


class AdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advice
        fields = ("id", "question", "answer")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id",
            "user",
            "text",
            "rating",
            "created_at",
            "updated_at",
            "is_approved",
        )
