from rest_framework.permissions import BasePermission
from accounts.models import User


class IsParentOfChild(BasePermission):
    """
    Разрешает доступ только родителю, который связан с ребёнком.
    """

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_authenticated
            and request.user.role == User.RoleChoices.PARENT
            and obj.parent == request.user
        )


class IsTrainer(BasePermission):
    """
    Разрешает доступ только тренеру.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == User.RoleChoices.TRAINER
        )


class IsOwner(BasePermission):
    """
    Разрешает доступ только владельцу обьекта.
    """

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class IsTrainerOfTrainingDay(BasePermission):
    """
    Разрешает доступ только тренеру обьекта.
    """

    def has_object_permission(self, request, view, obj):
        return request.user == obj.trainer


class IsChildOfParent(BasePermission):
    """
    Разрешает доступ только ребенку владельца обьекта родители.
    """

    def has_object_permission(self, request, view, obj):
        print(obj.childrens.all(), request.user)
        return (
            request.user.is_authenticated
            and request.user.role == User.RoleChoices.CHILD
            and obj.childrens.filter(user=request.user).exists()
        )


class IsChild(BasePermission):
    """
    Разрешает доступ только ребенку.
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == User.RoleChoices.CHILD
        )
