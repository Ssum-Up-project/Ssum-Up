from django.db import models
from django.forms import DateTimeField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager



# Create your models here.
class Product(models.Model):
  name = models.CharField(max_length=70)
  price = models.IntegerField()
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name



class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('must have user email')
        user = self.model(
            email = self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password = password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    # id = models.AutoField(primary_key=True)
    username = None
    email = models.EmailField(default='',  verbose_name='email', max_length=100, unique=True)
    
    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)    
    is_admin = models.BooleanField(default=False)
    
    # 헬퍼 클래스 사용
    objects = UserManager()

    # 사용자의 username field는 email으로 설정
    USERNAME_FIELD = 'email'
    # 필수로 작성해야하는 field
    # REQUIRED_FIELDS = ['email'] # 에러남

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Category(models.Model):
  name = models.CharField(max_length=50)
  content = models.CharField(max_length=300)
  create_at = models.DateTimeField(auto_now_add=True)
  
  user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name='category')

  def __str__(self):
    return self.name