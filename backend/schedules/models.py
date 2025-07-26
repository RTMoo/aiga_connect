from django.db import models


class BaseTrainingSession(models.Model):
    class StatusChoices(models.TextChoices):
        SCHEDULED = "scheduled", "Запланировано"
        FINISHED = "finished", "Закончено"
        CANCELED = "canceled", "Отменено"

    trainer = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    discipline = models.ForeignKey(
        "commons.Discipline", on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
    status = models.CharField(choices=StatusChoices.choices)

    class Meta:
        abstract = True


class GroupTrainingSession(BaseTrainingSession):
    class Meta:
        unique_together = ("trainer", "date")

    def __str__(self):
        return (
            f"{self.trainer.username} — {self.date} {self.start_time}-{self.end_time}"
        )


class IndividualTrainingSession(BaseTrainingSession):
    to_child = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="individual_trainings"
    )
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ("trainer", "to_child", "date")

    def __str__(self):
        return f"{self.trainer.username} — {self.date} ({self.start_time}-{self.end_time}) для {self.to_child.username}"
