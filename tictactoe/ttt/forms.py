from django import forms
from django.forms import ModelForm, PasswordInput
from .models import Registration

class RegForm(forms.ModelForm):
	class Meta:
		model = Registration
		fields=['first_name','last_name','username','password','email']
		widgets = {
			'password' : PasswordInput(),
		}
