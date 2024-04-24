from django.db import models
from django.contrib.auth.models import User



class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=26)
    author = models.CharField(max_length=26)
    image = models.FileField(upload_to='user_files/', null=True, blank=True) 
    publish_year = models.DateField()
    genre=models.CharField(max_length=26)
    create = models.DateField(auto_now_add=True)

    
