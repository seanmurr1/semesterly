# Generated by Django 2.2.18 on 2021-09-20 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0033_auto_20210724_1528'),
    ]

    operations = [
        migrations.CreateModel(
            name='MockStudent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mock_first_name', models.CharField(default='', max_length=255, null=True)),
                ('mock_last_name', models.CharField(default='', max_length=255, null=True)),
                ('mock_class_year', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]