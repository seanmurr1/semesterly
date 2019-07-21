import registration.views
from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^pilot/?$', registration.views.index, name='index'),
)
