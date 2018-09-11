from django.db import models
from django import forms

class Todo(models.Model):
    TASK_STATE = (
        ('active', 'active'),
        ('archived', 'archived'),
    )

    PIN_TASK_STATE = (
        ('default', 'default'),
        ('pinned', 'pinned'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    state = models.CharField(max_length=8, choices=TASK_STATE, default='active')
    pin = models.CharField(max_length=7, choices=PIN_TASK_STATE, default='default')

    def __str__(self):
        """A string representation of the model."""
        return self.title
