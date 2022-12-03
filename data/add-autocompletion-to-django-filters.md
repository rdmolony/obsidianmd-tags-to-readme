I use filters to enable users to query a table of sensors by country, project & station name.  As there are a lot of values, I'm using `CharField` with `icontains` to let users type `CH` and filter out `Chile`.  I want to add autocompletion so that `Chile` appears in a dropdown list on typing `CH`

I can use `django-autocomplete-light` alongside `django-filter` to do so.

I must first add a new autocompletion view ...

```python
from dal import autocomplete


class CountryAutocomplete(autocomplete.Select2QuerySetView):        
    def get_queryset(self):
        if self.q:
            qs = FkCountry.objects.filter(name__istartswith=self.q)
        else:
            qs = FkCountry.objects.objects.all()
        return qs
```

```python
from views import CountryAutocomplete


urlpatterns = [
    ...
    url(
        "^country-autocomplete$",
        CountryAutocomplete.as_view(),
        name="country-autocomplete"
    ),
]
```

> **Note**: this is queried by `django-autocomplete-light` `Javascript` to generate the autocompletion values

I can override the default `django-filter` widget for the `ModelChoiceFilter` ...

```python
from dal import autocomplete
import django_filter as filters

from stationmanager import models


class SensorQualityFilter(filters.FilterSet):
    class Meta:
        model = SensorQuality
        fields = []

    country = filters.ModelChoiceFilter(
        field_name="station__idproject__idcountry__name",
        label="Country",
        queryset=models.FkCountry.objects.all(),
        widget=autocomplete.ModelSelect2('country-autocomplete'),
    )
    ...
```

... and link it to my table view ...

```python
from django_filters.views import FilterView
import django_tables2 as tables

from stationmanager import models


class StationListView(tables.SingleTableMixin, FilterView):
    model = models.Station
    table_class = tables.StationTable
    template_name = 'stationmanager/station_list.html'
    filterset_class = filters.StationFilter
```

... and add some `Javascript` to my template footer ...

```html
{% block head %}
    {% load static %}
    {% load render_table from django_tables2 %}
    {% load export_url from django_tables2 %}
    {% load bootstrap3 %}
{% endblock %}

{% block body %}
<div class="container">
{% if filter %}
    <form action="" method="get" class="form form-inline">
        {% bootstrap_form filter.form layout='inline' %}
    
        <div class="text-right">
            <button type="submit" id="filter" class="btn">Filter</button>
        </div>
    </form>
{% endif %}
</div>

{% render_table table 'django_tables2/bootstrap.html' %}
{% endblock %}

{% block footer %}
{{ filter.form.media }}
{% endblock %}
```

> https://github.com/carltongibson/django-filter/issues/211
> https://stackoverflow.com/questions/40502794/django-filter-with-django-autocomplete-light
> https://stackoverflow.com/questions/38799632/django-filter-with-django-autocomplete-light

#django
#django-tables2
#django-filter
#django-autocomplete-light