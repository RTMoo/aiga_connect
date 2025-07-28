from typing import Any
from accounts.models import User
from accounts.selectors import get_user
from grades.models import Grade
from schedules.selectors import (
    get_group_training_session,
    get_individual_training_session,
)
from schedules.utils import check_training_session_finished
from trainer_requests.utils import check_trainer_athlete_relationship
from grades.utils import check_individual_session_access


def grading_group_athlete(
    trainer: User,
    training_session_id: int,
    data: dict[str, Any],
) -> Grade:
    athlete = get_user(data.pop("athlete_username"))

    check_trainer_athlete_relationship(trainer, athlete)

    training_session = get_group_training_session(training_session_id)

    check_training_session_finished(training_session)

    return Grade.objects.create(
        group_training_session=training_session,
        athlete=athlete,
        grade=data["grade"],
        notes=data["notes"],
    )


def grading_individual_athlete(
    trainer: User,
    training_session_id: int,
    data: dict[str, Any],
) -> Grade:
    athlete = get_user(data.pop("athlete_username"))

    check_trainer_athlete_relationship(trainer, athlete)

    training_session = get_individual_training_session(training_session_id)

    check_individual_session_access(trainer, athlete, training_session)
    check_training_session_finished(training_session)

    return Grade.objects.create(
        individual_training_session=training_session,
        athlete=athlete,
        grade=data["grade"],
        notes=data["notes"],
    )
