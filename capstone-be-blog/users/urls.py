from django.urls import path, include, re_path
from .views import RegisterView, ShowProfile
from rest_framework.authtoken import views

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('register/', RegisterView.as_view()),
    re_path(r'^profile/$', ShowProfile.as_view()),
    path('auth/token/', views.obtain_auth_token)
]