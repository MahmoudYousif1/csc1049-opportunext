from haystack import indexes
from .models import Job

class JobIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title', null=True)
    company_title = indexes.CharField(model_attr='company_title', null=True)
    location = indexes.CharField(model_attr='location', null=True)
    description = indexes.CharField(model_attr='description', null=True)
    med_salary = indexes.IntegerField(model_attr='med_salary', null=True)
    formatted_skills_desc = indexes.CharField(model_attr='formatted_skills_desc', null=True)
    pay_period = indexes.CharField(model_attr='pay_period', null=True)
    max_salary = indexes.IntegerField(model_attr='max_salary', null=True)

    def get_model(self):
        return Job

    def index_queryset(self, using=None):
        return self.get_model().objects.all()
