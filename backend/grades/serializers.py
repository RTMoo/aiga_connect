from rest_framework import serializers
from grades.models import Grade


class GradeSerializer(serializers.Serializer):
    athlete = serializers.CharField(source="athlete.username", read_only=True)
    athlete_username = serializers.CharField(write_only=True)
    grade = serializers.IntegerField(min_value=1, max_value=10, required=False)
    notes = serializers.CharField(
        required=False, allow_blank=True, allow_null=True, max_length=512
    )
    attendance = serializers.ChoiceField(choices=Grade.StatusChoices.choices)
