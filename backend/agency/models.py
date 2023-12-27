from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Service(models.Model):
    name = models.CharField(max_length=63)
    description = models.TextField()


class Agency(models.Model):
    name = models.CharField(max_length=63)
    description = models.TextField()
    agency_values = models.TextField()
    services = models.ManyToManyField(Service)

    @classmethod
    def get_or_create_agency(cls):
        return cls.objects.get_or_create(pk=1)

    def save(self, *args, **kwargs):
        if not self.pk and Agency.objects.filter(pk=1).exists():
            raise ValueError("Only one instance of Agency is allowed.")
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Agency"


class EventType(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class Organizer(models.Model):
    description = models.TextField()
    first_name = models.CharField(max_length=63)
    last_name = models.CharField(max_length=63)
    position = models.CharField(max_length=63)
    phone = models.CharField(max_length=13)
    email = models.EmailField()

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.position}"


class Event(models.Model):
    organizers = models.ManyToManyField(Organizer)
    description = models.TextField()
    name = models.CharField(max_length=63)
    number_of_guests = models.IntegerField()
    event_type = models.OneToOneField(EventType, on_delete=models.CASCADE)
    date = models.DateField()
    style = models.CharField(
        max_length=63,
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.event_type.name}"


class Advice(models.Model):
    question = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return self.question


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.PositiveIntegerField(
        default=5, choices=[(i, i) for i in range(1, 6)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return f"Review by {self.user.username} - {self.created_at}"

    class Meta:
        ordering = ["-created_at"]
