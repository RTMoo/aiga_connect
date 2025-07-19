from profiles.models import ChildProfile, ParentProfile, TrainerProfile
from rest_framework.exceptions import NotFound
from accounts.models import User

MODEL = {
    User.RoleChoices.PARENT: ParentProfile,
    User.RoleChoices.CHILD: ChildProfile,
    User.RoleChoices.TRAINER: TrainerProfile,
}


def get_profile(
    username: str, role: User.RoleChoices
) -> ChildProfile | ParentProfile | TrainerProfile:
    profile = (
        MODEL[role]
        .objects.filter(user__username=username)
        .select_related("user")
        .first()
    )

    if not profile:
        raise NotFound(detail="Профиль не найден")

    return profile
