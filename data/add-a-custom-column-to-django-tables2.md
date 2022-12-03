I can add a custom column for which no corresponding database field exists to `django-tables2` rendered `HTML` table once I add a corresponding method to my model.

I can target this method via `accessor` ...

```python
# models.py
class MyModel(models.Model):
    my_field = models.TextField()
    my_field_2 = models.IntegerField()

    def my_function(self):
        # Return some calculated value based on the entry
        return my_value

# tables.py
class MyTable(tables.Table):

    my_extra_column = tables.Column(
	    accessor='my_function',
        verbose_name='My calculated value'
    )

    class Meta:
        fields = ['my_field', 'my_field_2', 'my_extra_column']
        model = MyModel
```

> [django - Custom columns in django_tables2 - Stack Overflow](https://stackoverflow.com/questions/35840153/custom-columns-in-django-tables2)

... or I can add it as a property ...

```python
# models.py
class Person(models.Model):
    first_name = models.CharField(max_length=200)
    family_name = models.CharField(max_length=200)

    @property
    def name(self):
        return "{} {}".format(self.first_name, self.family_name)

# tables.py
class PersonTable(tables.Table):
    name = tables.Column()
```

> https://django-tables2.readthedocs.io/en/latest/pages/ordering.html

#django 
#django-tables2
#python 