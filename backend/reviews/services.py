from typing import Any

from accounts.models import User
from accounts.selectors import get_user
from reviews.models import TrainerReview
from trainer_requests.utils import (
    check_trainer_athlete_relationship,
    check_trainer_parent_relationship,
)
from rest_framework.exceptions import PermissionDenied
from reviews.selectors import get_trainer_review


def create_trainer_review(sender: User, data: dict[str, Any]) -> TrainerReview:
    trainer = get_user(data.pop("trainer_username"))

    if sender.role == User.RoleChoices.ATHLETE:
        check_trainer_athlete_relationship(trainer=trainer, athlete=sender)
    elif sender.role == User.RoleChoices.PARENT:
        check_trainer_parent_relationship(trainer=trainer, parent=sender)
    else:
        raise PermissionDenied("Вы не можете оставить отзыв")

    return TrainerReview.objects.create(
        trainer=trainer,
        author=sender,
        comment=data["comment"],
        rating=data["rating"],
    )


def edit_trainer_review(
    review_id: int, sender: User, data: dict[str, Any]
) -> TrainerReview:
    review = get_trainer_review(review_id=review_id)

    if review.author != sender:
        raise PermissionDenied("Вы не можете редактировать отзыв")

    review.comment = data["comment"]
    review.rating = data["rating"]
    review.save()

    return review


def delete_trainer_review(review_id: int, sender: User) -> None:
    review = get_trainer_review(review_id=review_id)

    if review.author != sender:
        raise PermissionDenied("Вы не можете удалить отзыв")

    review.delete()
