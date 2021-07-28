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
import logging

from parsing.schools.active import ACTIVE_SCHOOLS


class SubdomainMiddleware(object):
    def process_request(self, request):

        # Dump all META
        for item in request.META.items():
            logging.error(item)

        # Define domain suffixes for non-prod environments
        
        nonprod_suffixes = ("-dev", "-test", "-stage", "-prod")
        prod_suffixes = ("sem", "semester")

        if 'HTTP_X_Original_Host' in request.META:
            subdomain = request.META.get('HTTP_X_Original_Host', '')
        else:
            subdomain = request.META.get('HTTP_HOST', '')

        logging.error('SUBDOMAIN')
        logging.error(subdomain)

        subdomain = subdomain.split('.')[0].strip().lower()

        logging.error("FOLLOWING SPLIT")
        logging.error(subdomain)

        if subdomain in ACTIVE_SCHOOLS:
            request.subdomain = subdomain
            logging.error("ACTIVE SCHOOLS")
        elif subdomain.endswith(nonprod_suffixes):
            # Default to JHU for non-prod URLs for ease of setup/testing
            request.subdomain = "jhu"
            logging.error("NONPROD_SUFFIXES")
        elif subdomain in (prod_suffixes):
            request.subdomain = None
            logging.error("PROD_SUFFIXES")
        else:
            request.subdomain = None
