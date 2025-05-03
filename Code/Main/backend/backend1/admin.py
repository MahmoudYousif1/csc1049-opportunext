from django.contrib import admin
from .models import Job, CV

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['job_id', 'title', 'company_title', 'max_salary', 'location', 'work_type', 'formatted_applies']

@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    list_display = ['user', 'cv_file']