# Generated by Django 4.1 on 2024-01-11 19:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0018_advice_priority"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="advice",
            options={"ordering": ["-priority"]},
        ),
    ]
