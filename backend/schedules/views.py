from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from commons.permissions import IsTrainer, IsTrainerOfTrainingDay
from schedules.serializers import (
    TrainingDaySerializer,
    IndividualTrainingSerializer,
    CancelIndividualTrainingSerializer,
)
from schedules.services import (
    create_training_day,
    edit_training_day,
    create_individual_training_day,
    edit_individual_training_day,
    cancel_individual_training_day,
)
from schedules.selectors import get_training_day


class CreateTrainingDayView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = TrainingDaySerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        training_day = create_training_day(
            trainer=request.user, data=serializer.validated_data
        )

        data = self.serializer_class(instance=training_day).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class EditTrainingDayView(APIView):
    permission_classes = [IsAuthenticated, IsTrainerOfTrainingDay]
    serializer_class = TrainingDaySerializer

    def patch(self, request: Request, training_day_id: int):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        training_day = get_training_day(training_day_id)
        self.check_object_permissions(request, training_day)

        edited_training_day = edit_training_day(
            training_day=training_day, data=serializer.validated_data
        )

        data = self.serializer_class(instance=edited_training_day).data

        return Response(data=data, status=status.HTTP_200_OK)


class DeleteTrainingDayView(APIView):
    permission_classes = [IsAuthenticated, IsTrainerOfTrainingDay]

    def delete(self, request: Request, training_day_id: int):
        training_day = get_training_day(training_day_id)
        self.check_object_permissions(request, training_day)

        training_day.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CreateIndividualTrainingDayView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = IndividualTrainingSerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        training_day = create_individual_training_day(
            trainer=request.user, data=serializer.validated_data
        )

        data = self.serializer_class(instance=training_day).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class EditIndividualTrainingDayView(APIView):
    permission_classes = [IsAuthenticated, IsTrainerOfTrainingDay]
    serializer_class = IndividualTrainingSerializer

    def patch(self, request: Request, training_day_id: int):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        training_day = get_training_day(training_day_id)
        self.check_object_permissions(request, training_day)

        edited_training_day = edit_individual_training_day(
            training_day=training_day, data=serializer.validated_data
        )

        data = self.serializer_class(instance=edited_training_day).data

        return Response(data=data, status=status.HTTP_200_OK)


class DeleteIndividualTrainingDayView(APIView):
    permission_classes = [IsAuthenticated, IsTrainerOfTrainingDay]

    def delete(self, request: Request, training_day_id: int):
        training_day = get_training_day(training_day_id)
        self.check_object_permissions(request, training_day)

        training_day.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class CancelIndividualTrainingDayView(APIView):
    permission_classes = [IsAuthenticated, IsTrainerOfTrainingDay]
    serializer_class = CancelIndividualTrainingSerializer

    def post(self, request: Request, training_day_id: int):
        training_day = get_training_day(training_day_id)
        self.check_object_permissions(request, training_day)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        training_day = cancel_individual_training_day(
            training_day=training_day, data=serializer.validated_data
        )
        data = self.serializer_class(instance=training_day).data

        return Response(data=data, status=status.HTTP_200_OK)
