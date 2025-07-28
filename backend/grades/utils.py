from accounts.models import User
from rest_framework.exceptions import PermissionDenied
from schedules.models import IndividualTrainingSession


def check_child_parent_relationship(athlete: User, sender: User):
    if sender.role == User.RoleChoices.PARENT and athlete.parent != sender:
        raise PermissionDenied("Ребёнок не связан с вами")


def check_individual_session_access(
    trainer: User, athlete: User, training_session: IndividualTrainingSession
):
    if training_session.trainer != trainer:
        raise PermissionDenied("Вы не можете взаимодействовать с этой тренировкой")

    if training_session.to_athlete != athlete:
        raise PermissionDenied("Эта тренировка не для вашего ребёнка")
