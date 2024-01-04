from rest_framework import viewsets
from agency.models import (
    Service,
    Agency,
    EventType,
    Organizer,
    Event,
    Advice,
    Review,
    CallRequest, Article,
)
from agency.serializers import (
    ServiceSerializer,
    AgencySerializer,
    EventTypeSerializer,
    OrganizerSerializer,
    EventSerializer,
    AdviceSerializer,
    ReviewSerializer,
    CallRequestSerializer, ArticleSerializer, ReviewListSerializer,
)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer


class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer


class OrganizerViewSet(viewsets.ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class AdviceViewSet(viewsets.ModelViewSet):
    queryset = Advice.objects.all()
    serializer_class = AdviceSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return ReviewListSerializer
        return ReviewSerializer


class CallRequestViewSet(viewsets.ModelViewSet):
    queryset = CallRequest.objects.all()
    serializer_class = CallRequestSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
