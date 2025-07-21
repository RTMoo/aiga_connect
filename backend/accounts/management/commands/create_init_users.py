from django.core.management.base import BaseCommand
from accounts.models import User
from profiles.models import TrainerProfile, ParentProfile, ChildProfile
from django.utils import timezone
from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = "Создаёт тестовых тренера, родителя и ребёнка"

    def handle(self, *args, **kwargs):
        try:
            # Создание тренера
            trainer_user = User.objects.create_user(
                username="trainer1",
                email="trainer1@example.com",
                password="password123",
                role=User.RoleChoices.TRAINER,
                email_verified=True,
            )
            TrainerProfile.objects.create(
                user=trainer_user,
                first_name="Иван",
                last_name="Тренеров",
                training_zone_address="ул. Тренерская, 10",
                monthly_price=15000.00,
            )
            self.stdout.write(self.style.SUCCESS("✅ Тренер создан."))
        except IntegrityError:
            self.stdout.write(self.style.SUCCESS("✅ Тренер уже создан."))

        try:
            # Создание родителя
            parent_user = User.objects.create_user(
                username="parent1",
                email="parent1@example.com",
                password="password123",
                role=User.RoleChoices.PARENT,
                email_verified=True,
            )
            ParentProfile.objects.create(
                user=parent_user,
                first_name="Мария",
                last_name="Родителева",
                address="ул. Родительская, 5",
            )
            self.stdout.write(self.style.SUCCESS("✅ Родитель создан."))
        except IntegrityError:
            self.stdout.write(self.style.SUCCESS("✅ Родитель уже создан."))

        try:
            # Создание ребёнка
            child_user = User.objects.create_user(
                username="child1",
                email="child1@example.com",
                password="password123",
                role=User.RoleChoices.CHILD,
                email_verified=True,
            )
            ChildProfile.objects.create(
                user=child_user,
                parent=parent_user,
                first_name="Петя",
                last_name="Родителев",
                birth_date=timezone.now().date(),
            )
            self.stdout.write(self.style.SUCCESS("✅ Ребёнок создан."))
        except IntegrityError:
            self.stdout.write(self.style.SUCCESS("✅ Ребёнок уже создан."))
        self.stdout.write(self.style.SUCCESS("🎉 Все пользователи успешно созданы."))
