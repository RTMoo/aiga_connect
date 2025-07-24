from django.db import models


class TrainerRequest(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = "pending", "Ожидает"
        ACCEPTED = "accepted", "Принята"
        REJECTED = "rejected", "Отклонена"

    parent = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="trainer_requests",
    )
    child = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="trainer_requests_for_child",
    )
    trainer = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="incoming_trainer_requests",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING,
    )
    notes = models.TextField(blank=True, max_length=128, null=True)

    class Meta:
        unique_together = ("child", "trainer")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.parent} → {self.trainer} (child: {self.child}) [{self.status}]"
