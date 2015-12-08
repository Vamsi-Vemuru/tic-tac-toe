from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Registration(models.Model):
	first_name = models.CharField(max_length=120,null=False)
	last_name = models.CharField(max_length=120,null=False)
	username = models.CharField(max_length=120,null=False,blank=True,default="")
	password = models.CharField(max_length=10,blank=True,default="")
	email = models.EmailField()
	def __unicode__(self):
		return self.first_name