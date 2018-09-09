from django.db import models
from django import forms

class Todo(models.Model):
    SET_OF_TASK_STATE = (
        ('archived', 'archived'),
        ('pinned', 'pinned'),
        ('active', 'active'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    state = models.CharField(max_length=8, choices=SET_OF_TASK_STATE, default='active')

    def __str__(self):
        """A string representation of the model."""
        return self.title
