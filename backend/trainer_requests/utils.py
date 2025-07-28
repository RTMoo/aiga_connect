from accounts.models import User
from rest_framework.exceptions import PermissionDenied
from trainer_requests.models import TrainerRequest


def check_trainer_athlete_relationship(trainer: User, athlete: User) -> None:
    if not TrainerRequest.objects.filter(athlete=athlete, trainer=trainer).exists():
        raise PermissionDenied("Ребёнок не прикреплён к тренеру.")
