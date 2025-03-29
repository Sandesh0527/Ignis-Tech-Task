from django.db import models

class Listing(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    address = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    image_urls = models.JSONField()
    ratings = models.DecimalField(max_digits=3, decimal_places=2)
    description = models.TextField()
    reviews = models.IntegerField()
    amenities = models.JSONField()
    host_info = models.JSONField()
    property_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title