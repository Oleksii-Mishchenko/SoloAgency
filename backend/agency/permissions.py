from rest_framework.permissions import BasePermission


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        return request.user and request.user.is_staff


class IsAdminOrCreateOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return request.user and request.user.is_staff


class IsAdminOrCreateReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        elif request.method == "POST":
            return request.user and request.user.is_authenticated
        elif request.method in ["PUT", "PATCH", "DELETE"]:
            return request.user and request.user.is_staff
        return False


class RegisteredUserCanCreateReadOnlyAdminCanModifyDelete(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET", "POST"]:
            return request.user and request.user.is_authenticated
        elif request.method in ["PUT", "PATCH", "DELETE"]:
            return request.user and request.user.is_staff
        return False
