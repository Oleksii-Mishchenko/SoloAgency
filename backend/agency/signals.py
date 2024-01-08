import os

import requests
from django.db.models.signals import post_save
from django.dispatch import receiver
from dotenv import load_dotenv
from agency.models import CallRequest, Event

load_dotenv()


@receiver(post_save, sender=Event)
def send_telegram_message_event_request(sender, instance, **kwargs):
    text = (
        f"Заявка на послуги {instance}: {instance.name}\n"
        f"Яке планується на {instance.date.strftime('%Y-%m-%d')},\n"
        f"Святкування планується у стилі {instance.style}\n"
        f"Орієнтовна кількість гостей {instance.number_of_guests}\n"
        f'Коментар від замовника: "{instance.description}\n\n"'
        f"created: {instance.created_at.strftime('%Y-%m-%d %H:%M')}"
    )

    token = os.getenv("TELEGRAM_BOT_TOKEN")
    channel_id = os.getenv("TELEGRAM_CHAT_ID")
    url = f"https://api.telegram.org/bot{token}/sendMessage"

    r = requests.post(url, data={"chat_id": channel_id, "text": text})

    if r.status_code != 200:
        raise Exception(f"Error sending Telegram message: {r.text}")

@receiver(post_save, sender=CallRequest)
def send_telegram_message_call_request(sender, instance, **kwargs):
    text = (
        f"New Call Request: {instance.phone}\n"
        f"{instance.name}, з міста {instance.city}\n"
        f"{instance.description}\n\n"
        f"created: {instance.created_at.strftime('%Y-%m-%d %H:%M')}"
    )

    token = os.getenv("TELEGRAM_BOT_TOKEN")
    channel_id = os.getenv("TELEGRAM_CHAT_ID")
    url = f"https://api.telegram.org/bot{token}/sendMessage"

    r = requests.post(url, data={"chat_id": channel_id, "text": text})

    if r.status_code != 200:
        raise Exception(f"Error sending Telegram message: {r.text}")
