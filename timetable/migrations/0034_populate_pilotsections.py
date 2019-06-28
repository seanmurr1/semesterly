from __future__ import unicode_literals

from django.db import migrations
from timetable.models import Integration, CourseIntegration, Course, Semester, PILOTSection, Section
from student.models import Student, PILOTOffering

def pop_pilot(apps, schema_editor):

	integration, created = Integration.objects.get_or_create(name="PILOT")
	integration.save()
	f19 = Semester.objects.get(year="2019", name="Fall")
	id = 0
	#Grabbing coursesIntegration objects that are supported by PILOT in Fall2019
	for course in CourseIntegration.objects.filter(semester=f19, integration=integration):
		course_id = course.course
		professors = []
		#creating list of professors for each course
		for section in Section.objects.filter(course=course_id, semester=f19):
			if section.instructors not in professors:
				professors.append(section.instructors)
		#Going through list and creating 1 PILOTSection per course/professor combo
		for prof in professors:
			sections = Section.objects.filter(semester=f19, course=course_id, instructors=prof)
			for sect in sections:
				pilot_section, created = PILOTSection.objects.get_or_create(id=id)
				pilot_section.sections.add(sect)
			id = id + 1

class Migration(migrations.Migration):

	dependencies = [
		('timetable', '0033_pilotsection'),
	]

	operations = [
		migrations.RunPython(pop_pilot)
	]