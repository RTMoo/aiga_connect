from typing import Any
from django.core.cache import cache
from rest_framework.exceptions import ValidationError, NotFound
from accounts.tasks import send_confirmation_email
from accounts.models import User


def register_user(data: dict[str, Any], sender: User) -> None:
    """
    Регистрирует нового пользователя или обновляет существующего.

    Args:
        data (dict[str, Any]): Словарь с данными пользователя:
            email (str): Email пользователя.
            username (str): Имя пользователя.
            password (str): Пароль пользователя.
            role (str): Роль пользователя.
        sender (User): Пользователь, инициирующий регистрацию.

    Raises:
        ValidationError: Если email уже используется подтвержденным пользователем.
    """

    if (
        not sender.is_anonymous
        and data["role"] == User.RoleChoices.CHILD
        and sender.role != User.RoleChoices.PARENT
    ):
        raise ValidationError({"role": "У вас должен быть роль 'Родитель'"})

    user = User.objects.filter(email=data["email"]).first()
    if user:
        if user.email_verified:
            raise ValidationError({"email": "Этот email уже используется"})
        if user.username != data["username"]:
            raise ValidationError({"username": "Имя пользователя уже используется"})

        # Обновить данные, если пользователь неактивен
        user.username = data["username"]
        user.role = data["role"]
        user.set_password(data["password"])
        user.save()
    else:
        user = User.objects.create_user(**data)

    send_confirmation_email.delay(user.email)


def confirm_code(data: dict[str, Any]) -> None:
    """
    Подтверждает email пользователя по коду.

    Args:
        data (dict[str, Any]): Словарь с данными:
            email (str): Email пользователя.
            code (str): Код подтверждения.

    Raises:
        NotFound: Если пользователь не найден.
        ValidationError: Если почта уже подтверждена, код истек или неверный.
    """

    email = data["email"]
    code = data["code"]

    user = User.objects.filter(email=email).first()

    if not user:
        raise NotFound(detail="Пользователь не найден")

    if user.email_verified:
        raise ValidationError(detail="Почта уже подтверждена")

    real_code = cache.get(email)

    if real_code is None:
        raise ValidationError(
            detail="Код истёк или не запрашивался",
        )

    if code != real_code:
        raise ValidationError(detail="Неверный код")

    user.email_verified = True
    user.save()

    cache.delete(email)
