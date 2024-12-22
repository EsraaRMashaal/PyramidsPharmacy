from django.db import models
from django.contrib.auth.models import User

USER_TYPE_CHOICES = [
        ('Admin', 'Admin'),
        ('Pharmacist', 'Pharmacist'),
        ('Doctor', 'Doctor'),
        ('Registered_User', 'Registered User'),
        ('Guest', 'Guest'),
    ]

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=255, choices=USER_TYPE_CHOICES, default='Guest')
    
    def __str__(self):
        return f"{self.user.username} - {self.user_type}"