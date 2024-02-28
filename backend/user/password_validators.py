from django.core.exceptions import ValidationError
import re


class CustomPasswordValidator:
    def validate(self, password, user=None):
        if not re.search(r"[A-Z]", password):
            raise ValidationError(
                "Password must contain at least one uppercase letter", code="no_upper"
            )
        if not re.search(r"[a-z]", password):
            raise ValidationError(
                "Password must contain at least one lowercase letter", code="no_lower"
            )
        if not re.search(r"[!@#$%^&*()_+=-]", password):
            raise ValidationError(
                "Password must contain at least one special character",
                code="no_special",
            )

    def get_help_text(self):
        return (
            "Your password must contain at least one uppercase letter, "
            "one lowercase letter, and one special character."
        )


class MaxLengthValidator:
    def validate(self, password, user=None):
        if len(password) > 20:
            raise ValidationError("Password must not exceed 20 characters.")

    def get_help_text(self):
        return "Password must not exceed 20 characters."
