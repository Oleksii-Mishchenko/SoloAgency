# Generated by Django 4.1 on 2024-02-07 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0027_remove_event_venue_alter_event_date_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="venue",
            field=models.CharField(blank=True, max_length=63, null=True),
        ),
    ]