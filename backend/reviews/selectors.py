from reviews.models import TrainerReview
from rest_framework.exceptions import NotFound


def get_trainer_review(review_id: int) -> TrainerReview:
    review = TrainerReview.objects.filter(id=review_id).first()

    if not review:
        raise NotFound(detail="Отзыв не найден")

    return review


def get_trainer_reviews_queryset(username: str) -> TrainerReview:
    return TrainerReview.objects.filter(trainer__username=username)
