# Generated by Django 5.0.2 on 2025-02-12 17:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend1', '0006_cluster_medoid_job'),
    ]

    operations = [
        migrations.AddField(
            model_name='cv',
            name='cv_vector',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='job',
            name='cluster',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='jobs', to='backend1.cluster'),
        ),
        migrations.AlterField(
            model_name='cluster',
            name='medoid_job',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='medoid_for_cluster', to='backend1.job'),
        ),
    ]
