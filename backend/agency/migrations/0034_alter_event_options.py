# Generated by Django 4.1 on 2024-02-16 06:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0033_alter_event_options"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="event",
            options={"ordering": ["date"]},
        ),
    ]
