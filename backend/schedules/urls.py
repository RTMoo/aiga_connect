from django.urls import path
from schedules import views


urlpatterns = [
    path(
        route="create/",
        view=views.CreateTrainingDayView.as_view(),
        name="create_training_day",
    ),
    path(
        route="<int:training_day_id>/edit/",
        view=views.EditTrainingDayView.as_view(),
        name="edit_training_day",
    ),
    path(
        route="<int:training_day_id>/delete/",
        view=views.DeleteTrainingDayView.as_view(),
        name="delete_training_day",
    ),
    path(
        route="individual/create/",
        view=views.CreateIndividualTrainingDayView.as_view(),
        name="create_individual_training_day",
    ),
    path(
        route="individual/<int:training_day_id>/edit/",
        view=views.EditIndividualTrainingDayView.as_view(),
        name="edit_individual_training_day",
    ),
    path(
        route="individual/<int:training_day_id>/delete/",
        view=views.DeleteIndividualTrainingDayView.as_view(),
        name="delete_individual_training_day",
    ),
    path(
        route="individual/<int:training_day_id>/cancel/",
        view=views.CancelIndividualTrainingDayView.as_view(),
        name="cancel_individual_training_day",
    ),
]
