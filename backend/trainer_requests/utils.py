from accounts.models import User
from rest_framework.exceptions import PermissionDenied
from trainer_requests.models import TrainerRequest


def check_trainer_child_relationship(trainer: User, child: User) -> None:
    if not TrainerRequest.objects.filter(child=child, trainer=trainer).exists():
        raise PermissionDenied("Ребёнок не прикреплён к тренеру.")
