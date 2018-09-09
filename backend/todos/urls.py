from django.urls import path

from . import views

urlpatterns = [
    path('tasks/', views.ListTodo.as_view()),
    path('tasks/<int:pk>/', views.DetailTodo.as_view()),
]
