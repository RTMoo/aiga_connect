from typing import Any

from trainer_requests.models import TrainerRequest
from accounts.models import User
from accounts.selectors import get_user
from django.db.utils import IntegrityError
from rest_framework.exceptions import ValidationError, PermissionDenied
from profiles.models import ChildProfile
from trainer_requests.selectors import get_trainer_request


def create_trainer_request(parent: User, data: dict[str, Any]) -> TrainerRequest:
    athlete = get_user(data["athlete_username"])
    trainer = get_user(data["trainer_username"])

    if not ChildProfile.objects.filter(user=athlete, parent=parent).exists():
        raise PermissionDenied("Ребёнок не принадлежит родителю")

    if trainer.role != User.RoleChoices.TRAINER:
        raise ValidationError("Тренер должен иметь роль 'trainer'")

    try:
        return TrainerRequest.objects.create(
            parent=parent,
            athlete=athlete,
            trainer=trainer,
            notes=data["notes"],
        )
    except IntegrityError:
        raise ValidationError("Заявка уже отправлена")


def accept_request(request_id: int, trainer: User):
    request = get_trainer_request(request_id)

    if request.trainer != trainer:
        raise PermissionDenied("Вы не можете принять эту заявку")

    request.status = TrainerRequest.StatusChoices.ACCEPTED

    request.save()


def reject_request(request_id: int, trainer: User):
    request = get_trainer_request(request_id)

    if request.trainer != trainer:
        raise PermissionDenied("Вы не можете отклонить эту заявку")

    request.status = TrainerRequest.StatusChoices.REJECTED

    request.save()


def cancel_trainer_request(request_id: int, parent: User):
    request = get_trainer_request(request_id)

    if request.parent != parent:
        raise PermissionDenied("Вы не можете отозвать эту заявку")

    request.delete()
