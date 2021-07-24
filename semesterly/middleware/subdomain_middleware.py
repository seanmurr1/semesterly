# Copyright (C) 2017 Semester.ly Technologies, LLC
#
# Semester.ly is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Semester.ly is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

from parsing.schools.active import ACTIVE_SCHOOLS

class SubdomainMiddleware(object):
	def process_request(self, request):
		subdomain = request.META.get('HTTP_HOST', '')\
					.split('.')[0]\
					.strip()\
					.lower()
		# Define domain suffixes for non-prod environments
        nonprod_subdomains = ("semesterly-dev", "semesterly-stage")
		if subdomain in ACTIVE_SCHOOLS:
			request.subdomain = subdomain
		elif subdomain(nonprod_subdomains):
			request.subdomain = subdomain
		else:
			request.subdomain = None
