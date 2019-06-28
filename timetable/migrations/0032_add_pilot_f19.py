from __future__ import unicode_literals

from django.db import migrations
from timetable.models import Integration, CourseIntegration, Course, Semester


def add_pilot_f19(apps, schema_editor):
	""" PILOT classes for Spring 2019"""
	pilot_codes = [
		"AS.110.106",
		"AS.110.107",
		"AS.110.108",
		"AS.110.109",
		"AS.110.202",
		"AS.110.201",
		"AS.110.302",
		"AS.030.101",
		"AS.030.205",
		"AS.171.101",
		"AS.171.107",
		"AS.171.102",
		"AS.171.103",
		"EN.500.112",
		"EN.553.171",
		"EN.553.111",
		"AS.210.112",
		"AS.280.350",
		"AS.280.345",
		"AS.180.101"
	]

	integration, created = Integration.objects.get_or_create(name="Pilot")
	integration.delete()

	integration, created = Integration.objects.get_or_create(name="PILOT")
	integration.save()

	if Semester.objects.filter(year="2019", name="Fall").exists():
		f19 = Semester.objects.get(year="2019", name="Fall")
		for code in pilot_codes:
			if Course.objects.filter(school="jhu",code=code).exists():
				course = Course.objects.filter(school="jhu",code=code)
				courseIntegration, created = CourseIntegration.objects.get_or_create(course=course[0],integration=integration,json='')
				if not created:
					courseIntegration.save()
				courseIntegration.semester.add(f19)
				courseIntegration.save()
			else:
				print("Course doesn't exist " + str(code))

class Migration(migrations.Migration):

	dependencies = [
		('timetable', '0030_add_pilot_s19'),
	]

	operations = [
		migrations.RunPython(add_pilot_f19)
	]
