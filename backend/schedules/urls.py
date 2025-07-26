from django.urls import path
from schedules import views


urlpatterns = [
    path(
        route="create/",
        view=views.CreateGroupTrainingSessionView.as_view(),
        name="create_group_training_session",
    ),
    path(
        route="<int:training_session_id>/edit/",
        view=views.EditGroupTrainingSessionView.as_view(),
        name="edit_group_training_session",
    ),
    path(
        route="<int:training_session_id>/cancel/",
        view=views.CancelGroupTrainingSessionView.as_view(),
        name="cancel_group_training_session",
    ),
    path(
        route="<int:training_session_id>/finish/",
        view=views.FinishGroupTrainingSessionView.as_view(),
        name="finish_group_training_session",
    ),
    path(
        route="individual/create/",
        view=views.CreateIndividualTrainingSessionView.as_view(),
        name="create_individual_training_session",
    ),
    path(
        route="individual/<int:training_session_id>/edit/",
        view=views.EditIndividualTrainingSessionView.as_view(),
        name="edit_individual_training_session",
    ),
    path(
        route="individual/<int:training_session_id>/cancel/",
        view=views.CancelIndividualTrainingSessionView.as_view(),
        name="cancel_individual_training_session",
    ),
    path(
        route="individual/<int:training_session_id>/finish/",
        view=views.FinishIndividualTrainingSessionView.as_view(),
        name="finish_individual_training_session",
    ),
]
