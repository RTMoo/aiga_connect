from rest_framework import serializers


class GradeSerializer(serializers.Serializer):
    child = serializers.CharField(source="child.username", read_only=True)
    child_username = serializers.CharField(write_only=True)
    grade = serializers.IntegerField(min_value=1, max_value=10)
    notes = serializers.CharField(required=False, allow_blank=True, max_length=512)
