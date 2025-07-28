from django.urls import path
from reviews import views


urlpatterns = [
    path(
        route="trainer/create/",
        view=views.CreateTrainerReviewView.as_view(),
        name="create_trainer_review",
    ),
    path(
        route="trainer/<int:review_id>/edit/",
        view=views.EditTrainerReviewView.as_view(),
        name="edit_trainer_review",
    ),
    path(
        route="trainer/<int:review_id>/delete/",
        view=views.DeleteTrainerReviewView.as_view(),
        name="delete_trainer_review",
    ),
    path(
        route="trainer/<str:username>/",
        view=views.GetTrainerReviewsView.as_view(),
        name="get_trainer_reviews",
    ),
]
