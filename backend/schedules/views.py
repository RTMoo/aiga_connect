from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from commons.permissions import IsTrainer
from schedules.serializers import (
    GroupTrainingSessionSerializer,
    IndividualTrainingSessionSerializer,
    TrainingSessionStatusSerializer,
)
from schedules import services


class CreateGroupTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = GroupTrainingSessionSerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        group_training_session = services.create_group_training_session(
            trainer=request.user, data=serializer.validated_data
        )

        data = self.serializer_class(instance=group_training_session).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class EditGroupTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IndividualTrainingSessionSerializer

    def patch(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        edited_group_training_session = services.edit_group_training_session(
            training_session=training_session_id,
            data=serializer.validated_data,
        )

        data = self.serializer_class(instance=edited_group_training_session).data

        return Response(data=data, status=status.HTTP_200_OK)


class CancelGroupTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = TrainingSessionStatusSerializer

    def post(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.cancel_group_training_session(
            trainer=request.user,
            training_session_id=training_session_id,
            data=serializer.validated_data,
        )

        return Response(status=status.HTTP_200_OK)


class CreateIndividualTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = IndividualTrainingSessionSerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        training_session = services.create_individual_training_session(
            trainer=request.user, data=serializer.validated_data
        )

        data = self.serializer_class(instance=training_session).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class EditIndividualTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IndividualTrainingSessionSerializer

    def patch(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        edited_training_session = services.edit_individual_training_session(
            training_session_id=training_session_id, data=serializer.validated_data
        )

        data = self.serializer_class(instance=edited_training_session).data

        return Response(data=data, status=status.HTTP_200_OK)


class CancelIndividualTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = TrainingSessionStatusSerializer

    def post(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.cancel_individual_training_session(
            trainer=request.user,
            training_session_id=training_session_id,
            data=serializer.validated_data,
        )

        return Response(status=status.HTTP_200_OK)


class FinishIndividualTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = TrainingSessionStatusSerializer

    def post(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.finish_individual_training_session(
            trainer=request.user,
            training_session_id=training_session_id,
            data=serializer.validated_data,
        )

        return Response(status=status.HTTP_200_OK)


class FinishGroupTrainingSessionView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = TrainingSessionStatusSerializer

    def post(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        services.finish_group_training_session(
            trainer=request.user,
            training_session_id=training_session_id,
            data=serializer.validated_data,
        )

        return Response(status=status.HTTP_200_OK)
