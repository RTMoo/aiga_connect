from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from commons.permissions import IsTrainer
from rest_framework.permissions import IsAuthenticated
from grades.serializers import GradeSerializer
from grades import services
from grades import selectors
from commons.permissions import IsChild, IsParent


class GradingGroupChildView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = GradeSerializer

    def post(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        grade = services.grading_group_child(
            trainer=request.user,
            training_session_id=training_session_id,
            data=serializer.validated_data,
        )

        data = self.serializer_class(instance=grade).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class GradingIndividualChildView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = GradeSerializer

    def post(self, request: Request, training_session_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        grade = services.grading_individual_child(
            trainer=request.user,
            training_session_id=training_session_id,
            data=serializer.validated_data,
        )

        data = self.serializer_class(instance=grade).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class GetChildGroupSessionGrades(APIView):
    permission_classes = [IsAuthenticated, IsChild | IsParent]
    serializer_class = GradeSerializer

    def get(self, request: Request, username: str):
        grades = selectors.get_child_group_grades(
            username=username, sender=request.user
        )
        data = self.serializer_class(instance=grades, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetChildIndividualSessionAllGrades(APIView):
    permission_classes = [IsAuthenticated, IsChild | IsParent]
    serializer_class = GradeSerializer

    def get(self, request: Request, username: str):
        grades = selectors.get_child_individual_grades(
            username=username, sender=request.user
        )
        data = self.serializer_class(instance=grades, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetTrainerGroupSessionAllGrades(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = GradeSerializer

    def get(self, request: Request, training_session_id: int):
        grades = selectors.get_trainer_group_session_grades(
            training_session_id=training_session_id, trainer=request.user
        )
        data = self.serializer_class(instance=grades, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetTrainerIndividualSessionGrades(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = GradeSerializer

    def get(self, request: Request, training_session_id: int):
        grades = selectors.get_trainer_individual_session_grades(
            training_session_id=training_session_id, trainer=request.user
        )
        data = self.serializer_class(instance=grades, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)
