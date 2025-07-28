from typing import Any, Union, Type
from commons.selectors import get_discipline
from accounts.selectors import get_user
from accounts.models import User
from schedules.models import GroupTrainingSession, IndividualTrainingSession
from rest_framework.exceptions import PermissionDenied, ValidationError


def pop_and_resolve_fields(data: dict[str, Any]) -> dict[str, Any]:
    """Преобразует поля discipline_id и to_athlete в объекты и подставляет в словарь."""
    data = data.copy()

    if "discipline_id" in data:
        discipline_id = data.pop("discipline_id")
        data["discipline"] = get_discipline(discipline_id)

    if "to_athlete" in data:
        user_id = data.pop("to_athlete")
        data["to_athlete"] = get_user(user_id)

    return data


def update_model_instance(instance: Any, data: dict[str, Any]):
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return instance


def change_training_session_status(
    trainer: User,
    session: Union[GroupTrainingSession, IndividualTrainingSession],
    expected_model: Type,
    new_status: str,
) -> None:
    if not isinstance(session, expected_model):
        raise ValidationError("Неверный тип тренировочной сессии.")

    if session.trainer != trainer:
        raise PermissionDenied("Вы не можете управлять этой сессией.")

    if session.status != expected_model.StatusChoices.SCHEDULED:
        raise ValidationError("Сессию нельзя завершить или отменить повторно.")

    session.status = new_status
    session.save()


def check_training_session_finished(
    session: Union[GroupTrainingSession, IndividualTrainingSession],
):
    if session.status != session.StatusChoices.FINISHED:
        raise ValidationError("Сессия не завершена.")


def check_training_session_scheduled(
    session: Union[GroupTrainingSession, IndividualTrainingSession],
):
    if session.status != session.StatusChoices.SCHEDULED:
        raise ValidationError("Сессия не запланирована.")
