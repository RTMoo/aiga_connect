from typing import Any
from accounts.models import User
from schedules.models import GroupTrainingSession, IndividualTrainingSession
from schedules.utils import pop_and_resolve_fields, update_model_instance
from schedules.selectors import (
    get_individual_training_session,
    get_group_training_session,
)
from schedules.utils import change_training_session_status


def create_group_training_session(
    trainer: User, data: dict[str, Any]
) -> GroupTrainingSession:
    data = pop_and_resolve_fields(data)
    return GroupTrainingSession.objects.create(trainer=trainer, **data)


def create_individual_training_session(
    trainer: User, data: dict[str, Any]
) -> IndividualTrainingSession:
    data = pop_and_resolve_fields(data)
    return IndividualTrainingSession.objects.create(trainer=trainer, **data)


def edit_group_training_session(
    training_session_id: int, data: dict[str, Any]
) -> GroupTrainingSession:
    training_session = get_group_training_session(training_session_id)
    data = pop_and_resolve_fields(data)
    return update_model_instance(training_session, data)


def edit_individual_training_session(
    training_session_id: int, data: dict[str, Any]
) -> IndividualTrainingSession:
    training_session = get_individual_training_session(training_session_id)
    data = pop_and_resolve_fields(data)
    return update_model_instance(training_session, data)


def cancel_individual_training_session(trainer: User, session_id: int) -> None:
    session = get_individual_training_session(session_id)
    change_training_session_status(
        trainer,
        session,
        IndividualTrainingSession,
        IndividualTrainingSession.StatusChoices.CANCELED,
    )
    # TODO: Уведомление


def cancel_group_training_session(trainer: User, session_id: int) -> None:
    session = get_group_training_session(session_id)
    change_training_session_status(
        trainer,
        session,
        GroupTrainingSession,
        GroupTrainingSession.StatusChoices.CANCELED,
    )
    # TODO: Уведомление


def finish_individual_training_session(trainer: User, session_id: int) -> None:
    session = get_individual_training_session(session_id)
    change_training_session_status(
        trainer,
        session,
        IndividualTrainingSession,
        IndividualTrainingSession.StatusChoices.FINISHED,
    )


def finish_group_training_session(trainer: User, session_id: int) -> None:
    session = get_group_training_session(session_id)
    change_training_session_status(
        trainer,
        session,
        GroupTrainingSession,
        GroupTrainingSession.StatusChoices.FINISHED,
    )
