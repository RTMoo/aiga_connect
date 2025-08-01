from rest_framework import serializers


class DisciplineSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=128)
    slug = serializers.SlugField(max_length=128)


class BaseProfileSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=32, source="user.username", read_only=True
    )
    user_id = serializers.IntegerField(source="user.id", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)
    user_role = serializers.CharField(source="user.role", read_only=True)
    user_email_verified = serializers.BooleanField(source="user.email_verified", read_only=True)
    first_name = serializers.CharField(max_length=32)
    last_name = serializers.CharField(max_length=32)
    birth_date = serializers.DateField(required=False, allow_null=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    updated_at = serializers.DateTimeField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)


class TrainerProfileSerializer(BaseProfileSerializer):
    bio = serializers.CharField(required=False, allow_blank=True)
    training_zone_address = serializers.CharField(max_length=255)
    monthly_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    disciplines = DisciplineSerializer(many=True, read_only=True)
    disciplines_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )


class ParentProfileSerializer(BaseProfileSerializer):
    address = serializers.CharField(max_length=255, required=False, allow_blank=True)


class AthleteProfileSerializer(BaseProfileSerializer):
    height_cm = serializers.IntegerField(required=False, allow_null=True)
    weight_kg = serializers.IntegerField(required=False, allow_null=True)
    belt_grade = serializers.CharField(
        max_length=50, required=False, allow_null=True, allow_blank=True
    )
    disciplines = DisciplineSerializer(many=True, read_only=True)
    disciplines_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )


class ChildProfileSerializer(AthleteProfileSerializer):
    parent = serializers.CharField(source="parent.username")
