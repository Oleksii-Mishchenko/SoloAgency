from django.db.models.functions import Random
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import viewsets, serializers
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
    IsAuthenticated,
    AllowAny,
)
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
from agency.permissions import IsAdminOrReadOnly, IsAdminOrCreateOnly
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
    permission_classes = [
        IsAdminOrReadOnly,
    ]


class AgencyViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencySerializer
    permission_classes = [
        IsAdminOrReadOnly,
    ]


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
    permission_classes = [
        IsAdminOrReadOnly,
    ]

    def get_serializer_class(self):
        if self.action == "list":
            return OrganizerListSerializer
        return OrganizerSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    # permission_classes = [
    #     IsAuthenticatedOrReadOnly,
    # ]

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
    # permission_classes = [
    #     IsAdminOrReadOnly,
    # ]

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

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="is_approved",
                type={"type": "string"},
                description="Filter theatre halls by is_approved.",
                required=False,
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class CallRequestViewSet(viewsets.ModelViewSet):
    queryset = CallRequest.objects.all()
    serializer_class = CallRequestSerializer
    permission_classes = [IsAdminOrCreateOnly,]


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminOrReadOnly,]


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

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="title",
                type=str,
                description="Filter portfolios by title.",
                required=False,
            )
        ]
    )
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        return self.paginated_response(queryset, PortfolioSerializer)
