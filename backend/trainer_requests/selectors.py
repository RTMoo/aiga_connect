from rest_framework.exceptions import NotFound
from trainer_requests.models import TrainerRequest
from accounts.models import User


def get_trainer_request(request_id: int) -> TrainerRequest:
    request = TrainerRequest.objects.filter(id=request_id).first()

    if not request:
        raise NotFound(detail="Запрос не найден")

    return request


def get_trainer_requests_queryset(trainer: User):
    return TrainerRequest.objects.filter(trainer=trainer)


def get_parent_requests_queryset(parent: User):
    return TrainerRequest.objects.filter(parent=parent)
