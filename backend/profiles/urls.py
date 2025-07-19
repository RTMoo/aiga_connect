from django.urls import path
from profiles import views


urlpatterns = [
    path(
        route="me/",
        view=views.GetMyProfileView.as_view(),
        name="get_my_profile",
    ),
    path(
        route="children/<str:username>/edit/",
        view=views.EditChildrenProfileView.as_view(),
        name="edit_children_profile",
    ),
    path(
        route="children/<str:username>/",
        view=views.GetChildrenProfileView.as_view(),
        name="get_children_profile",
    ),
    path(
        route="parent/<str:username>/",
        view=views.GetParentProfileView.as_view(),
        name="get_children_profile",
    ),
    path(
        route="parent/my-profile/edit/",
        view=views.EditParentProfileView.as_view(),
        name="edit_parent_profile",
    ),
    path(
        route="trainer/<str:username>/",
        view=views.GetTrainerProfileView.as_view(),
        name="get_trainer_profile",
    ),
    path(
        route="trainer/my-profile/edit/",
        view=views.EditTrainerProfileView.as_view(),
        name="edit_trainer_profile",
    ),
]
