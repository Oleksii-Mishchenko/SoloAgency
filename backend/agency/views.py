from rest_framework import viewsets, serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response

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
from agency.pagination import LargeResultsSetPagination
from agency.serializers import (
    ServiceSerializer,
    AgencySerializer,
    EventTypeSerializer,
    OrganizerSerializer,
    EventSerializer,
    AdviceSerializer,
    ReviewSerializer,
    CallRequestSerializer,
    ArticleSerializer,
    ReviewListSerializer,
    OrganizerListSerializer,
    EventListSerializer,
)
import telebot


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer


class EventTypeViewSet(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
    pagination_class = LargeResultsSetPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = EventTypeSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response({
                'num_pages': self.paginator.page.paginator.num_pages,
                'results': serializer.data
            })

        serializer = EventTypeSerializer(queryset, many=True, context={'request': request})
        return Response({
            'num_pages': 1,
            'results': serializer.data
        })


class OrganizerViewSet(viewsets.ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return OrganizerListSerializer
        return OrganizerSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return EventListSerializer
        return EventSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class AdviceViewSet(viewsets.ModelViewSet):
    queryset = Advice.objects.all()
    serializer_class = AdviceSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return ReviewListSerializer
        return ReviewSerializer

    def get_queryset(self):
        queryset = Review.objects.all()

        is_approved_param = self.request.query_params.get("is_approved")

        if is_approved_param is not None:
            if is_approved_param.lower() == "true":
                queryset = queryset.filter(is_approved=True)
            elif is_approved_param.lower() == "false":
                queryset = queryset.filter(is_approved=False)
            else:
                raise serializers.ValidationError(
                    {"is_approved": "Incorrect input use 'true' or 'false'."}
                )

        return queryset

    @action(detail=True, methods=["POST"])
    def approve(self, request, pk=None):
        review = self.get_object()
        review.is_approved = True
        review.save()
        return Response({"status": "Comment approved"}, status=status.HTTP_200_OK)


class CallRequestViewSet(viewsets.ModelViewSet):
    queryset = CallRequest.objects.all()
    serializer_class = CallRequestSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
