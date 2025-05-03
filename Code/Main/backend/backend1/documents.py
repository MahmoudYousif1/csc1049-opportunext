from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Job

@registry.register_document
class JobDocument(Document):
    description = fields.TextField(analyzer='standard')

    class Index:
        name = 'jobs'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

    class Django:
        model = Job
        fields = [
            'job_id',
            'title',
            'company_title',
            'location',
            'med_salary',
            'pay_period',
            'max_salary',
            'formatted_skills_desc',
            'work_type',
            'formatted_applies',
        ]

#[1] - setting up elasticsearch with Django: https://www.youtube.com/watch?v=2TZBs12dZzo&t=64s
