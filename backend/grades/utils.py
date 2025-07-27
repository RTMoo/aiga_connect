from accounts.models import User
from rest_framework.exceptions import PermissionDenied
from schedules.models import IndividualTrainingSession


def check_child_parent_relationship(child: User, sender: User):
    if sender.role == User.RoleChoices.PARENT and child.parent != sender:
        raise PermissionDenied("Ребёнок не связан с вами")


def check_individual_session_access(
    trainer: User, child: User, training_session: IndividualTrainingSession
):
    if training_session.trainer != trainer:
        raise PermissionDenied("Вы не можете оценивать эту тренировку")

    if training_session.to_child != child:
        raise PermissionDenied("Эта тренировка не для вашего ребёнка")
