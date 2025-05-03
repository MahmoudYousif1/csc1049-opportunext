from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CV, Recommendation, Job

class Users(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class JobSerializer(serializers.ModelSerializer):
    """  Serializer to return job details in recommendations """
    class Meta:
        model = Job
        fields = ['job_id', 'title', 'company_title', 'location', 'description', 'max_salary']

class RecommendationSerializer(serializers.ModelSerializer):
    """  Serializer for recommendations """
    job = JobSerializer(read_only=True) 

    class Meta:
        model = Recommendation
        fields = ['id', 'user', 'job']
        extra_kwargs = {'user': {'read_only': True}}

#[1] - Django framework overview: https://www.youtube.com/watch?v=cJveiktaOSQ
