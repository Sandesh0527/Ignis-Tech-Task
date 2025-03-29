import scrapy
import json
import requests
from datetime import datetime
from urllib.parse import urlencode

class AirbnbSpider(scrapy.Spider):
    name = 'airbnb'
    allowed_domains = ['airbnb.com']
    
    def __init__(self, location=None, check_in=None, check_out=None, guests=None, *args, **kwargs):
        super(AirbnbSpider, self).__init__(*args, **kwargs)
        self.location = location
        self.check_in = check_in
        self.check_out = check_out
        self.guests = guests or '1'
        
    def start_requests(self):
        params = {
            'query': self.location,
            'checkin': self.check_in,
            'checkout': self.check_out,
            'adults': self.guests,
        }
        
        url = f'https://www.airbnb.com/s/{self.location}/homes?{urlencode(params)}'
        yield scrapy.Request(url, callback=self.parse)
        
    def parse(self, response):
        # Extract the listing data from the page
        listings = response.css('div[itemprop="itemListElement"]')
        
        for listing in listings:
            data = {
                'title': listing.css('meta[itemprop="name"]::attr(content)').get(),
                'location': self.location,
                'price_per_night': self.extract_price(listing.css('span[data-testid="price-and-discounted-price"]::text').get()),
                'currency': 'USD',  # Default to USD
                'image_urls': listing.css('img::attr(src)').getall(),
                'ratings': listing.css('span[aria-label*="rating"]::text').get(),
                'reviews': self.extract_reviews(listing.css('span[aria-label*="reviews"]::text').get()),
                'property_type': listing.css('div[data-testid="listing-card-subtitle"]::text').get(),
            }
            
            listing_url = listing.css('a::attr(href)').get()
            if listing_url:
                yield scrapy.Request(
                    response.urljoin(listing_url),
                    callback=self.parse_listing_details,
                    meta={'listing_data': data}
                )
                
        # Handle pagination
        next_page = response.css('a[aria-label="Next"]::attr(href)').get()
        if next_page:
            yield scrapy.Request(response.urljoin(next_page), callback=self.parse)
            
    def parse_listing_details(self, response):
        listing_data = response.meta['listing_data']
        
        # Extract additional details
        listing_data.update({
            'description': response.css('div[data-section-id="DESCRIPTION_DEFAULT"]::text').get(),
            'address': response.css('div[data-section-id="LOCATION_DEFAULT"] address::text').get(),
            'amenities': response.css('div[data-section-id="AMENITIES_DEFAULT"] div::text').getall(),
            'host_info': {
                'name': response.css('div[data-testid="host-name"]::text').get(),
                'joined_date': response.css('div[data-testid="host-join-date"]::text').get(),
            }
        })
        
        # Send data to Django backend
        self.send_to_backend(listing_data)
        
    def extract_price(self, price_str):
        if not price_str:
            return None
        # Remove currency symbol and convert to float
        return float(price_str.replace('$', '').replace(',', ''))
        
    def extract_reviews(self, reviews_str):
        if not reviews_str:
            return 0
        # Extract number from string like "(123 reviews)"
        return int(''.join(filter(str.isdigit, reviews_str)))
        
    def send_to_backend(self, data):
        url = 'http://localhost:8000/api/listings/'
        headers = {'Content-Type': 'application/json'}
        response = requests.post(url, json=data, headers=headers)
        self.log(f'Sent data to backend. Response: {response.status_code}')