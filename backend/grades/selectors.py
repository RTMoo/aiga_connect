from grades.models import Grade
from accounts.models import User
from accounts.selectors import get_user
from grades.utils import check_child_parent_relationship


def get_child_group_grades(username: str, sender: User):
    child = get_user(username)
    check_child_parent_relationship(child, sender)

    return Grade.objects.filter(child=child, group_training_session__isnull=False)


def get_child_individual_grades(username: str, sender: User):
    child = get_user(username)
    check_child_parent_relationship(child, sender)

    return Grade.objects.filter(child=child, individual_training_session__isnull=False)


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
