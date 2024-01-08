# Generated by Django 4.1 on 2024-01-08 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0008_alter_callrequest_city_alter_callrequest_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="advice",
            name="answer",
            field=models.TextField(max_length=511),
        ),
        migrations.AlterField(
            model_name="advice",
            name="question",
            field=models.TextField(max_length=255),
        ),
        migrations.AlterField(
            model_name="eventtype",
            name="description",
            field=models.TextField(max_length=255),
        ),
        migrations.AlterField(
            model_name="organizer",
            name="description",
            field=models.TextField(max_length=511),
        ),
        migrations.AlterField(
            model_name="service",
            name="description",
            field=models.TextField(max_length=255),
        ),
    ]
