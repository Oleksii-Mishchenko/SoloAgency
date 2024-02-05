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
        f"Нова заявка на послуги:\n\n"
        f"Дата події: {instance.date.strftime('%Y-%m-%d')}\n"
        f"Місто: {instance.city}\n"
        f"Місце проведення: {instance.venue}\n"
        f"Тип події: {instance.event_type.name}\n"
        f"Контактний номер: {instance.phone}\n"
        f"Кількість гостей: {instance.number_of_guests}\n"
        f"Стиль події: {instance.style}\n"
        f'Коментар від замовника: "{instance.description}"\n\n'
        f"Заявка створена: {instance.created_at.strftime('%Y-%m-%d %H:%M')}"
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
        f"Новий запит на дзвінок:\n\n"
        f"Дата створення: {instance.created_at.strftime('%Y-%m-%d %H:%M')}\n"
        f"Ім'я: {instance.name}\n"
        f"Місто: {instance.city}\n"
        f"Номер телефону: {instance.phone}\n"
    )

    if instance.description:
        text += f"Додатковий опис: {instance.description}\n"

    token = os.getenv("TELEGRAM_BOT_TOKEN")
    channel_id = os.getenv("TELEGRAM_CHAT_ID")
    url = f"https://api.telegram.org/bot{token}/sendMessage"

    r = requests.post(url, data={"chat_id": channel_id, "text": text})

    if r.status_code != 200:
        raise Exception(f"Error sending Telegram message: {r.text}")
