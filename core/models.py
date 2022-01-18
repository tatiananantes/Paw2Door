from operator import mod
from django.db import models
from django.db.models.base import Model
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, phone_number, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, phone_number=phone_number)

        user.set_password(password)
        user.save()

        return user

# Create your models here.
class Shelter(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone_number']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email

class Pet(models.Model):
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    image = models.ImageField(blank=True, null=True)
    age = models.IntegerField(null=True)
    species = models.CharField(max_length=50)
    gender = models.CharField(max_length=50)
    bio = models.TextField()
    
    def __str__(self):
        return self.name