# Generated by Django 4.1 on 2024-02-26 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0003_alter_user_first_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="last_name",
            field=models.CharField(
                blank=True, max_length=150, null=True, verbose_name="last name"
            ),
        ),
    ]