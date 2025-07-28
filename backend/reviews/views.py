from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from reviews.serializers import TrainerReviewSerializer
from reviews import services
from reviews import selectors
from commons.permissions import IsAthlete, IsParent
from rest_framework.permissions import IsAuthenticated


class CreateTrainerReviewView(APIView):
    permission_classes = [IsParent | IsAthlete]
    serializer_class = TrainerReviewSerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        review = services.create_trainer_review(
            sender=request.user, data=serializer.validated_data
        )
        data = self.serializer_class(instance=review).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class EditTrainerReviewView(APIView):
    permission_classes = [IsParent | IsAthlete]
    serializer_class = TrainerReviewSerializer

    def post(self, request: Request, review_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        review = services.edit_trainer_review(
            review_id=review_id, sender=request.user, data=serializer.validated_data
        )
        data = self.serializer_class(instance=review).data

        return Response(data=data, status=status.HTTP_200_OK)


class DeleteTrainerReviewView(APIView):
    permission_classes = [IsParent | IsAthlete]
    serializer_class = TrainerReviewSerializer

    def post(self, request: Request, review_id: int):
        services.delete_trainer_review(review_id=review_id, sender=request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)


class GetTrainerReviewsView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TrainerReviewSerializer

    def get(self, request: Request, username: str):
        reviews = selectors.get_trainer_reviews_queryset(username=username)
        data = self.serializer_class(instance=reviews, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)
