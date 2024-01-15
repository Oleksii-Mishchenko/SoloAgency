from rest_framework.routers import DefaultRouter
from agency.views import (
    ServiceViewSet,
    AgencyViewSet,
    EventTypeViewSet,
    OrganizerViewSet,
    EventViewSet,
    AdviceViewSet,
    ReviewViewSet,
    CallRequestViewSet,
    ArticleViewSet,
    PortfolioViewSet,
)

router = DefaultRouter()
router.register(r"services", ServiceViewSet)
router.register(r"agencies", AgencyViewSet)
router.register(r"event-types", EventTypeViewSet)
router.register(r"organizers", OrganizerViewSet)
router.register(r"events", EventViewSet)
router.register(r"advices", AdviceViewSet)
router.register(r"reviews", ReviewViewSet)
router.register(r"call-requests", CallRequestViewSet)
router.register(r"articles", ArticleViewSet)
router.register(r"portfolio", PortfolioViewSet)


urlpatterns = router.urls

app_name = "agency"
