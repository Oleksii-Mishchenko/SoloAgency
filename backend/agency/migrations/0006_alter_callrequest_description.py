# Generated by Django 4.1 on 2024-01-08 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0005_alter_callrequest_phone_alter_organizer_phone"),
    ]

    operations = [
        migrations.AlterField(
            model_name="callrequest",
            name="description",
            field=models.TextField(blank=True, max_length=200, null=True),
        ),
    ]
