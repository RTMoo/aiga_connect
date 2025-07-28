from django.urls import path
from grades import views


urlpatterns = [
    path(
        route="athlete/<str:username>/individual/all/",
        view=views.GetAthleteIndividualSessionAllGrades.as_view(),
        name="get_athlete_individual_session_grades",
    ),
    path(
        route="athlete/<str:username>/group/all/",
        view=views.GetAthleteGroupSessionGrades.as_view(),
        name="get_athlete_group_session_grades",
    ),
    
    path(
        route="create/individual/<int:training_session_id>/",
        view=views.GradingIndividualAthleteView.as_view(),
        name="grading_individual_athlete",
    ),
    path(
        route="create/group/<int:training_session_id>/",
        view=views.GradingGroupAthleteView.as_view(),
        name="grading_group_athlete",
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
]
