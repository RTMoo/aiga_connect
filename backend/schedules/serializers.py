from rest_framework import serializers
from schedules.models import TrainingDay


class BaseTrainingDaySerializer(serializers.Serializer):
    trainer = serializers.CharField(source="trainer.username", read_only=True)
    discipline = serializers.CharField(source="discipline.slug", read_only=True)
    discipline_id = serializers.IntegerField(write_only=True)
    start_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M"],
    )
    end_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M"],
    )
    created_at = serializers.DateTimeField(read_only=True)


class TrainingDaySerializer(BaseTrainingDaySerializer):
    day_of_week = serializers.ChoiceField(choices=TrainingDay.DaysOfWeek.choices)


class IndividualTrainingSerializer(BaseTrainingDaySerializer):
    child = serializers.CharField(source="child.username", read_only=True)
    child_username = serializers.CharField(write_only=True)
    training_date = serializers.DateField()
    canceled = serializers.BooleanField(read_only=True)
    notes = serializers.CharField(required=False, allow_blank=True)


class CancelIndividualTrainingSerializer(serializers.Serializer):
    notes = serializers.CharField(required=False, allow_blank=True)
