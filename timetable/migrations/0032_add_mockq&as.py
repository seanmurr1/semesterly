"""
Copyright (C) 2017 Semester.ly Technologies, LLC
Semester.ly is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
Semester.ly is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
"""

from __future__ import unicode_literals

from django.db import migrations
from timetable.models import Question, Answer, Course
from student.models import Student


def add_mock_qa(apps, schema_editor):
    """ PILOT classes for Spring 2019"""
    mock_codes = [
        "AS.110.106",
        "AS.110.107",
    ]

    student1 = Student.objects.get(id=1)
    student2 = Student.objects.get(id=7)

    answer1, created = Answer.objects.get_or_create(text="Mock A1", responder=student1)
    if created:
        answer1.save()
    answer2, created = Answer.objects.get_or_create(text="Mock A2", responder=student2)
    if created:
        answer2.save()

    if Course.objects.filter(school="jhu",code="AS.110.106").exists():
        course = Course.objects.filter(school="jhu",code="AS.110.106")
        question, created = Question.objects.get_or_create(course=course[0], text="Mock Q", asker=student1)
        if created:
            question.save()
        question.answers.add(answer1,answer2)

    if Course.objects.filter(school="jhu",code="AS.110.107").exists():
        course = Course.objects.filter(school="jhu",code="AS.110.107")
        question, created = Question.objects.get_or_create(course=course[0], text="Mock Q", asker=student2)
        if created:
            question.save()
        question.answers.add(answer1,answer2)

class Migration(migrations.Migration):

    dependencies = [
        ('timetable', '0031_answer_question'),
    ]

    operations = [
        migrations.RunPython(add_mock_qa)
    ]