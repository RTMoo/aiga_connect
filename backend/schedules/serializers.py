from rest_framework import serializers


class BaseTrainingSessionSerializer(serializers.Serializer):
    trainer = serializers.CharField(source="trainer.username", read_only=True)
    discipline = serializers.CharField(source="discipline.slug", read_only=True)
    discipline_id = serializers.IntegerField(write_only=True)
    date = serializers.DateField()
    start_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M"],
    )
    end_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M"],
    )
    created_at = serializers.DateTimeField(read_only=True)
    canceled = serializers.BooleanField(read_only=True)


class GroupTrainingSessionSerializer(BaseTrainingSessionSerializer):
    pass


class IndividualTrainingSessionSerializer(BaseTrainingSessionSerializer):
    athlete = serializers.CharField(source="to_athlete.username", read_only=True)
    athlete_username = serializers.CharField(write_only=True)
    notes = serializers.CharField(required=False, allow_blank=True)


class TrainingSessionStatusSerializer(serializers.Serializer):
    notes = serializers.CharField(required=False, allow_blank=True)
