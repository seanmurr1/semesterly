# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2019-05-12 16:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0031_auto_20190424_1821'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='questions',
        ),
        migrations.RemoveField(
            model_name='question',
            name='answers',
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='timetable.Question'),
        ),
        migrations.AddField(
            model_name='question',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='timetable.Course'),
        ),
    ]
