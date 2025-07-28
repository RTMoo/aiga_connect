from accounts.models import User
from rest_framework.exceptions import PermissionDenied
from trainer_requests.models import TrainerRequest


def check_trainer_athlete_relationship(trainer: User, athlete: User) -> None:
    if not TrainerRequest.objects.filter(athlete=athlete, trainer=trainer).exists():
        raise PermissionDenied("Атлет не прикреплён к тренеру.")


def check_trainer_parent_relationship(trainer: User, parent: User) -> None:
    if not TrainerRequest.objects.filter(parent=parent, trainer=trainer).exists():
        raise PermissionDenied("Родитель не прикреплён к тренеру.")
