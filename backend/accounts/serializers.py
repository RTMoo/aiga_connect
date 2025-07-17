from rest_framework import serializers

from accounts.models import User


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.RoleChoices.choices, required=True)


class ConfirmCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField()
