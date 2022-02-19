from django.db import models
from django.forms import DateTimeField
from django.contrib.auth.models import User


# Create your models here.
class Product(models.Model):
  name = models.CharField(max_length=70)
  price = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name


class Post(models.Model):
  title = models.CharField(max_length=50)
  content = models.CharField(max_length=300)
  create_at = models.DateTimeField(auto_now_add=True)
  
  owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='post')

  def __str__(self):
    return self.title
