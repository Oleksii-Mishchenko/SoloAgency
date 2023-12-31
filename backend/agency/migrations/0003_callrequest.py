# Generated by Django 4.1 on 2023-12-28 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0002_organizer_photo"),
    ]

    operations = [
        migrations.CreateModel(
            name="CallRequest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("name", models.CharField(max_length=63)),
                ("description", models.TextField()),
                ("phone", models.BigIntegerField()),
            ],
        ),
    ]
