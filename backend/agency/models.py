import os
import uuid

from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db import models

from django.utils.text import slugify


User = get_user_model()


def organizer_photo_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.full_name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads/organizers", filename)


def event_type_photo_file_path(instance, filename):
    _, extension = os.path.splitext(filename)
    filename = f"{slugify(instance.name)}-{uuid.uuid4()}{extension}"

    return os.path.join("uploads/event-types", filename)


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return self.title


class Service(models.Model):
    name = models.CharField(max_length=63)
    description = models.TextField(max_length=255)

    def __str__(self):
        return self.name


class Agency(models.Model):
    name = models.CharField(max_length=63)
    articles = models.ManyToManyField(Article)
    services = models.ManyToManyField(Service)

    def save(self, *args, **kwargs):
        self.id = 1
        if Agency.objects.exclude(id=1).exists():
            raise ValueError("Only one instance of Agency with id=1 is allowed.")

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Agency"


class EventType(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(max_length=255)
    photo = models.ImageField(
        upload_to=event_type_photo_file_path,
    )

    def __str__(self):
        return self.name


class Organizer(models.Model):
    description = models.TextField(max_length=511)
    first_name = models.CharField(max_length=63)
    last_name = models.CharField(max_length=63)
    position = models.CharField(max_length=63)
    phone_validator = RegexValidator(
        regex=r'^\+380\d{9}$',
        message="Phone number must be entered in the format: '+380XXXXXXXXX'."
    )
    phone = models.CharField(max_length=13, validators=[phone_validator])
    email = models.EmailField()
    photo = models.ImageField(
        upload_to=organizer_photo_file_path,
    )

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.position}"


class Event(models.Model):
    service = models.ForeignKey("Service", on_delete=models.CASCADE)
    organizers = models.ManyToManyField(
        Organizer,
    )

    description = models.TextField()
    name = models.CharField(max_length=63)
    number_of_guests = models.IntegerField()
    event_type = models.ForeignKey(EventType, on_delete=models.CASCADE)
    date = models.DateField()
    style = models.CharField(
        max_length=63,
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_events")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.event_type.name}"


class Advice(models.Model):
    question = models.TextField(max_length=255)
    answer = models.TextField(max_length=511)

    def __str__(self):
        return self.question


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(200)
    rating = models.PositiveIntegerField(
        default=5, choices=[(i, i) for i in range(1, 6)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Review by {self.user.username} - {self.created_at}"

    class Meta:
        ordering = ["-created_at"]


class CallRequest(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    string_validator = RegexValidator(
        regex=r'^[a-zA-Z]+$',
        message="Name must contain only letters."
    )
    name = models.CharField(max_length=63, validators=[string_validator])
    description = models.TextField(null=True, blank=True, max_length=255)
    city = models.CharField(max_length=63, null=True, blank=True, validators=[string_validator])

    phone_validator = RegexValidator(
        regex=r'^\+380\d{9}$',
        message="Phone number must be entered in the format: '+380XXXXXXXXX'."
    )
    phone = models.CharField(max_length=13, validators=[phone_validator])

    def __str__(self):
        return f"CallRequest: {self.name} {self.phone}"
