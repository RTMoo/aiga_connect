from typing import Any, Union
from profiles.models import ChildProfile, ParentProfile, TrainerProfile
from accounts.models import User


MODEL = {
    User.RoleChoices.PARENT: ParentProfile,
    User.RoleChoices.CHILD: ChildProfile,
    User.RoleChoices.TRAINER: TrainerProfile,
}


def create_profile(
    user: User,
    **extra_fields: dict[str, Any],
) -> Union[ChildProfile, ParentProfile, TrainerProfile]:
    return MODEL[user.role].objects.create(user=user, **extra_fields)


def edit_profile(
    profile: Union[ChildProfile, ParentProfile, TrainerProfile],
    data: dict[str, Any],
) -> Union[ChildProfile, ParentProfile, TrainerProfile]:
    for key, value in data.items():
        setattr(profile, key, value)

    discipilines_ids = data.get("discipilines_ids", None)
    if discipilines_ids:
        profile.discipilines.set(discipilines_ids)

    profile.save()

    return profile
