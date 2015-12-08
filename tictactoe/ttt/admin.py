from django.contrib import admin
from .models import *
# Register your models here.
class RegAdmin(admin.ModelAdmin):
	list_display = ['__unicode__','email']
	class Meta:
		model = Registration

admin.site.register(Registration, RegAdmin)