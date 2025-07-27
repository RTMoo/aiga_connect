from django.urls import path
from grades import views


urlpatterns = [
    path(
        route="create/individual/<int:training_session_id>/",
        view=views.GradingIndividualChildView.as_view(),
        name="grading_individual_child",
    ),
    path(
        route="create/group/<int:training_session_id>/",
        view=views.GradingGroupChildView.as_view(),
        name="grading_group_child",
    ),
    path(
        route="trainer/individual/<int:training_session_id>/",
        view=views.GetTrainerIndividualSessionGrades.as_view(),
        name="get_trainer_individual_session_grades",
    ),
    path(
        route="trainer/group/<int:training_session_id>/",
        view=views.GetTrainerGroupSessionAllGrades.as_view(),
        name="get_trainer_group_session_grades",
    ),
    path(
        route="child/individual/all/",
        view=views.GetChildIndividualSessionAllGrades.as_view(),
        name="get_child_individual_session_grades",
    ),
    path(
        route="child/group/all/",
        view=views.GetChildGroupSessionGrades.as_view(),
        name="get_child_group_session_grades",
    ),
]
