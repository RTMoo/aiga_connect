from django.urls import path
from trainer_requests import views


urlpatterns = [
    path(
        route="create/",
        view=views.CreateTrainerRequestView.as_view(),
        name="create_trainer_request",
    ),
    path(
        route="<int:request_id>/accept/",
        view=views.AcceptTrainerRequestView.as_view(),
        name="accept_trainer_request",
    ),
    path(
        route="<int:request_id>/reject/",
        view=views.RejectTrainerRequestView.as_view(),
        name="reject_trainer_request",
    ),
    path(
        route="<int:request_id>/cancel/",
        view=views.CancelTrainerRequestView.as_view(),
        name="cancel_trainer_request",
    ),
    path(
        route="trainer-requests/",
        view=views.GetTrainerRequestsView.as_view(),
        name="list_trainer_requests",
    ),
    path(
        route="parent-requests/",
        view=views.GetParentRequestsView.as_view(),
        name="list_parent_requests",
    ),
]
