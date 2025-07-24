from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from trainer_requests.serializers import TrainerRequestSerializer
from trainer_requests import services
from trainer_requests import selectors
from commons.permissions import IsParent, IsTrainer


class CreateTrainerRequestView(APIView):
    permission_classes = [IsAuthenticated, IsParent]
    serializer_class = TrainerRequestSerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        request = services.create_trainer_request(
            parent=request.user, data=serializer.validated_data
        )

        data = self.serializer_class(instance=request).data
        return Response(data=data, status=status.HTTP_201_CREATED)


class AcceptTrainerRequestView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]

    def post(self, request: Request, request_id):
        services.accept_request(request_id=request_id, trainer=request.user)

        return Response(status=status.HTTP_200_OK)


class RejectTrainerRequestView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]

    def post(self, request: Request, request_id):
        services.reject_request(request_id=request_id, trainer=request.user)

        return Response(status=status.HTTP_200_OK)


class CancelTrainerRequestView(APIView):
    permission_classes = [IsAuthenticated, IsParent]

    def delete(self, request: Request, request_id):
        services.cancel_trainer_request(request_id=request_id, parent=request.user)

        return Response(status=status.HTTP_200_OK)


class GetTrainerRequestsView(APIView):
    permission_classes = [IsAuthenticated, IsTrainer]
    serializer_class = TrainerRequestSerializer

    def get(self, request: Request):
        requests = selectors.get_trainer_requests(trainer=request.user)
        data = self.serializer_class(instance=requests, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)


class GetParentRequestsView(APIView):
    permission_classes = [IsAuthenticated, IsParent]
    serializer_class = TrainerRequestSerializer

    def get(self, request: Request):
        requests = selectors.get_parent_requests_queryset(parent=request.user)
        data = self.serializer_class(instance=requests, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)
