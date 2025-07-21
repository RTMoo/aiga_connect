from typing import Any
from accounts.models import User
from schedules.models import TrainingDay, IndividualTraining
from schedules.utils import pop_and_resolve_fields, update_model_instance


def create_training_day(trainer: User, data: dict[str, Any]) -> TrainingDay:
    data = pop_and_resolve_fields(data)
    return TrainingDay.objects.create(trainer=trainer, **data)


def edit_training_day(training_day: TrainingDay, data: dict[str, Any]) -> TrainingDay:
    data = pop_and_resolve_fields(data)
    return update_model_instance(training_day, data)


def create_individual_training_day(
    trainer: User, data: dict[str, Any]
) -> IndividualTraining:
    data = pop_and_resolve_fields(data)
    return IndividualTraining.objects.create(trainer=trainer, **data)


def edit_individual_training_day(
    training_day: IndividualTraining, data: dict[str, Any]
) -> IndividualTraining:
    data = pop_and_resolve_fields(data)
    return update_model_instance(training_day, data)


def cancel_individual_training_day(
    training_day: TrainingDay, data: dict[str, Any]
) -> TrainingDay:
    data["canceled"] = True

    # TODO: Уведомление о отмене

    return update_model_instance(training_day, data)
