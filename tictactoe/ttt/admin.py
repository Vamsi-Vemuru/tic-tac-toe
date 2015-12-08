from django.contrib import admin
from .models import *
from .forms import RegForm
# Register your models here.
class RegAdmin(admin.ModelAdmin):
	list_display = ['first_name','email']
	class Meta:
		model = Registration

admin.site.register(Registration, RegAdmin)