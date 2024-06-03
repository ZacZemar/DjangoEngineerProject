from django.db import models

class Major(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    avg_salary = models.DecimalField(max_digits=10, decimal_places=2)
    most_popular_job = models.CharField(max_length=100)
    growth_rate = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.name
