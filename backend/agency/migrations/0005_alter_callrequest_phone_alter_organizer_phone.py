# Generated by Django 4.1 on 2024-01-08 16:08

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0004_alter_eventtype_photo_alter_organizer_photo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="callrequest",
            name="phone",
            field=models.CharField(
                max_length=13,
                validators=[
                    django.core.validators.RegexValidator(
                        message="Phone number must be entered in the format: '+380XXXXXXXXX'.",
                        regex="^\\+380\\d{9}$",
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="organizer",
            name="phone",
            field=models.CharField(
                max_length=13,
                validators=[
                    django.core.validators.RegexValidator(
                        message="Phone number must be entered in the format: '+380XXXXXXXXX'.",
                        regex="^\\+380\\d{9}$",
                    )
                ],
            ),
        ),
    ]
