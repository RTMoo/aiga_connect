from grades.models import Grade
from accounts.models import User
from accounts.selectors import get_user


def get_athlete_group_grades(username: str, sender: User):
    athlete = get_user(username)

    return Grade.objects.filter(athlete=athlete, group_training_session__isnull=False)


def get_athlete_individual_grades(username: str, sender: User):
    athlete = get_user(username)

    return Grade.objects.filter(
        athlete=athlete, individual_training_session__isnull=False
    )


def get_trainer_group_session_grades(training_session_id: int, trainer: User):
    return Grade.objects.filter(
        group_training_session=training_session_id,
        group_training_session__trainer=trainer,
    )


def get_trainer_individual_session_grades(training_session_id: int, trainer: User):
    return Grade.objects.filter(
        individual_training_session=training_session_id,
        individual_training_session__trainer=trainer,
    )
