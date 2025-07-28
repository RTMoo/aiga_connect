from rest_framework import serializers


class BaseReviewSerializer(serializers.Serializer):
    rating = serializers.IntegerField(min_value=1, max_value=5)
    comment = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)


class TrainerReviewSerializer(BaseReviewSerializer):
    trainer_username = serializers.CharField(write_only=True)
