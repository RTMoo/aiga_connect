from django.db import models
from django.core import validators


class BaseReview(models.Model):
    author = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="trainer_reviews",
    )
    rating = models.PositiveIntegerField(
        validators=[
            validators.MinValueValidator(1),
            validators.MaxValueValidator(5),
        ]
    )
    comment = models.TextField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class TrainerReview(BaseReview):
    trainer = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    class Meta:
        unique_together = ("trainer", "author")
