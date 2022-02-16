from django.db import models

# Create your models here.
class Product(models.Model):
  name = models.CharField(max_length=70)
  price = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name

class User(models.Model):
  user_id = models.CharField(max_length=20)
  pw = models.CharField(max_length=20)
