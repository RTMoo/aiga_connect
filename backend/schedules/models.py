from django.db import models


class BaseTrainingDay(models.Model):
    trainer = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    start_time = models.TimeField()
    end_time = models.TimeField()
    discipline = models.ForeignKey(
        "commons.Discipline", on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class TrainingDay(BaseTrainingDay):
    class DaysOfWeek(models.IntegerChoices):
        MONDAY = 1, "Понедельник"
        TUESDAY = 2, "Вторник"
        WEDNESDAY = 3, "Среда"
        THURSDAY = 4, "Четверг"
        FRIDAY = 5, "Пятница"
        SATURDAY = 6, "Суббота"
        SUNDAY = 7, "Воскресенье"

    day_of_week = models.IntegerField(choices=DaysOfWeek.choices)

    class Meta:
        unique_together = ("trainer", "day_of_week")

    def __str__(self):
        return f"{self.trainer.username} - {self.day_of_week} {self.start_time}-{self.end_time}"


class IndividualTraining(BaseTrainingDay):
    to_child = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="trainings"
    )
    date = models.DateField()
    canceled = models.BooleanField(default=False)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ("trainer", "to_child", "date")

    def __str__(self):
        return f"{self.trainer.username} — {self.date} ({self.start_time}-{self.end_time}) для {self.child.username}"
