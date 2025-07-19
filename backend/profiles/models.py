from django.db import models
from accounts.models import User
from django.core.exceptions import ValidationError


class BaseProfile(models.Model):
    user = models.OneToOneField("accounts.User", on_delete=models.CASCADE)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        abstract = True


class TrainerProfile(BaseProfile):
    bio = models.TextField(blank=True)
    training_zone_address = models.CharField(max_length=255)
    monthly_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return f"Тренер: {self.get_full_name()}"


class ParentProfile(BaseProfile):
    address = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Родитель: {self.get_full_name()}"


class ChildProfile(BaseProfile):
    parent = models.ForeignKey(
        "profiles.ParentProfile",
        on_delete=models.CASCADE,
        related_name="childrens",
    )

    height_cm = models.PositiveIntegerField(null=True, blank=True)
    weight_kg = models.PositiveIntegerField(null=True, blank=True)
    belt_grade = models.CharField(max_length=50, null=True, blank=True)
    discipline = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.get_full_name()} (Ребёнок {self.parent.get_full_name()})"

    def clean(self):
        if self.parent.role != User.RoleChoices.PARENT:
            raise ValidationError("Родитель должен иметь роль 'parent'")
