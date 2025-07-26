from schedules.models import GroupTrainingSession, IndividualTrainingSession
from rest_framework.exceptions import NotFound


def get_group_training_session(training_session_id: int) -> GroupTrainingSession:
    training_session = GroupTrainingSession.objects.filter(
        id=training_session_id
    ).first()

    if not training_session:
        raise NotFound(detail="Тренировка не найдена")

    return training_session


def get_individual_training_session(
    training_session_id: int,
) -> IndividualTrainingSession:
    training_session = IndividualTrainingSession.objects.filter(
        id=training_session_id
    ).first()

    if not training_session:
        raise NotFound(detail="Тренировка не найдена")

    return training_session
