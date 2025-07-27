from django.db import models
from django.core import validators
from django.core.exceptions import ValidationError


class Grade(models.Model):
    group_training_session = models.ForeignKey(
        "schedules.GroupTrainingSession",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    individual_training_session = models.ForeignKey(
        "schedules.IndividualTrainingSession",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    child = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="grades",
    )
    grade = models.IntegerField(
        validators=[
            validators.MinValueValidator(1),
            validators.MaxValueValidator(10),
        ]
    )
    notes = models.TextField(blank=True, max_length=512, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if bool(self.group_training_session) == bool(self.individual_training_session):
            raise ValidationError(
                "Должна быть указана либо групповая, либо индивидуальная сессия, но не обе."
            )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
