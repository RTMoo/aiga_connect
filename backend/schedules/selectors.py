from schedules.models import TrainingDay
from rest_framework.exceptions import NotFound


def get_training_day(training_day_id: int) -> TrainingDay:
    training_day = TrainingDay.objects.filter(id=training_day_id).first()

    if not training_day:
        raise NotFound(detail="Тренировка не найдена")

    return training_day
