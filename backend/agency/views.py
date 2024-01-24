from django.db.models.functions import Random
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
    Portfolio,
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
    # ReviewListSerializer,
    OrganizerListSerializer,
    EventListSerializer,
    PortfolioSerializer,
)


class PaginationMixin:
    pagination_class = LargeResultsSetPagination

    def paginated_response(self, queryset, serializer):
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer_instance = serializer(
                page, many=True, context={"request": self.request}
            )
            return self.get_paginated_response({"results": serializer_instance.data})

        serializer_instance = serializer(
            queryset, many=True, context={"request": self.request}
        )
        return Response({"num_pages": 1, "results": serializer_instance.data})


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer


class EventTypeViewSet(
    PaginationMixin,
    viewsets.ModelViewSet,
):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return self.paginated_response(queryset, EventTypeSerializer)


class OrganizerViewSet(viewsets.ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return OrganizerListSerializer
        return OrganizerSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                return Event.objects.all()
            else:
                return Event.objects.filter(user=user)
        else:
            return Event.objects.none()

    def get_serializer_class(self):
        if self.action == "list":
            return EventListSerializer
        return EventSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class AdviceViewSet(
    PaginationMixin,
    viewsets.ModelViewSet,
):
    queryset = Advice.objects.all()
    serializer_class = AdviceSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return self.paginated_response(queryset, AdviceSerializer)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Review.objects.all()

        is_approved_param = self.request.query_params.get("is_approved")

        if is_approved_param is not None:
            if is_approved_param.lower() == "true":
                queryset = queryset.filter(is_approved=True).order_by(Random())
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


class PortfolioViewSet(
    PaginationMixin,
    viewsets.ModelViewSet,
):
    serializer_class = PortfolioSerializer
    queryset = Portfolio.objects.all()

    def get_queryset(self):
        queryset = Portfolio.objects.all()

        # filtering by title
        title = self.request.query_params.get("title")

        if title:
            queryset = queryset.filter(title__icontains=title)

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return self.paginated_response(queryset, PortfolioSerializer)
