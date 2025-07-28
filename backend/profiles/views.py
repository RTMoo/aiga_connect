from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from commons.permissions import (
    IsParentOfChild,
    IsTrainer,
    IsOwner,
    IsChildOfParent,
)
from profiles.serializers import (
    ChildProfileSerializer,
    TrainerProfileSerializer,
    ParentProfileSerializer,
    AthleteProfileSerializer,
)
from profiles.selectors import get_profile
from profiles.services import edit_profile
from accounts.models import User


SERIALIZERS = {
    User.RoleChoices.PARENT: ParentProfileSerializer,
    User.RoleChoices.TRAINER: TrainerProfileSerializer,
    User.RoleChoices.CHILD: ChildProfileSerializer,
    User.RoleChoices.ATHLETE: AthleteProfileSerializer,
}


class EditChildrenProfileView(APIView):
    permission_classes = [IsAuthenticated & IsParentOfChild]
    serializer_class = ChildProfileSerializer

    def patch(self, request: Request, username: str):
        profile = get_profile(username=username)
        self.check_object_permissions(request, profile)

        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        edited_profile = edit_profile(profile=profile, data=serializer.validated_data)
        data = self.serializer_class(instance=edited_profile).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetChildrenProfileView(APIView):
    permission_classes = [IsAuthenticated & (IsParentOfChild | IsTrainer | IsOwner)]
    serializer_class = ChildProfileSerializer

    def get(self, request: Request, username: str):
        profile = get_profile(username=username, role=User.RoleChoices.CHILD)
        self.check_object_permissions(request, profile)

        data = self.serializer_class(instance=profile).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetMyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self, role: User.RoleChoices):
        return SERIALIZERS[role]

    def get(self, request: Request):
        serializer = self.get_serializer_class(request.user.role)
        profile = get_profile(username=request.user.username, role=request.user.role)
        data = serializer(instance=profile).data

        return Response(data=data, status=status.HTTP_200_OK)


class EditParentProfileView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = ParentProfileSerializer

    def patch(self, request: Request):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        profile = get_profile(
            username=request.user.username, role=User.RoleChoices.PARENT
        )
        self.check_object_permissions(request, profile)

        edited_profile = edit_profile(profile=profile, data=serializer.validated_data)

        data = self.serializer_class(instance=edited_profile).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetParentProfileView(APIView):
    permission_classes = [IsAuthenticated, (IsChildOfParent | IsTrainer | IsOwner)]
    serializer_class = ParentProfileSerializer

    def get(self, request: Request, username: str):
        parent = get_profile(username=username, role=User.RoleChoices.PARENT)
        self.check_object_permissions(request, parent)

        data = self.serializer_class(instance=parent).data

        return Response(data=data, status=status.HTTP_200_OK)


class EditTrainerProfileView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = TrainerProfileSerializer

    def patch(self, request: Request):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        profile = get_profile(
            username=request.user.username, role=User.RoleChoices.TRAINER
        )
        self.check_object_permissions(request, profile)

        edited_profile = edit_profile(profile=profile, data=serializer.validated_data)

        data = self.serializer_class(instance=edited_profile).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetTrainerProfileView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TrainerProfileSerializer

    def get(self, request: Request, username: str):
        trainer = get_profile(username=username, role=User.RoleChoices.TRAINER)
        data = self.serializer_class(instance=trainer).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetAthleteProfileView(APIView):
    permission_classes = [IsOwner | IsTrainer]
    serializer_class = AthleteProfileSerializer

    def get(self, request: Request, username: str):
        athlete = get_profile(username=username, role=User.RoleChoices.ATHLETE)
        data = self.serializer_class(instance=athlete).data

        return Response(data=data, status=status.HTTP_200_OK)


class EditAthleteProfileView(APIView):
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = TrainerProfileSerializer

    def patch(self, request: Request):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        profile = get_profile(
            username=request.user.username, role=User.RoleChoices.ATHLETE
        )
        self.check_object_permissions(request, profile)

        edited_profile = edit_profile(profile=profile, data=serializer.validated_data)

        data = self.serializer_class(instance=edited_profile).data

        return Response(data=data, status=status.HTTP_200_OK)
