from rest_framework import serializers


class TrainerRequestSerializer(serializers.Serializer):
    parent = serializers.CharField(source="parent.username", read_only=True)
    athlete = serializers.CharField(source="athlete.username", read_only=True)
    athlete_username = serializers.CharField(write_only=True)
    trainer = serializers.CharField(source="trainer.username", read_only=True)
    trainer_username = serializers.CharField(write_only=True)
    notes = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(read_only=True)
