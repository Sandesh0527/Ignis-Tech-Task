from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from airbnb_scraper import AirbnbSpider

def run_spider(location, check_in, check_out, guests):
    process = CrawlerProcess(get_project_settings())
    
    process.crawl(
        AirbnbSpider,
        location=location,
        check_in=check_in,
        check_out=check_out,
        guests=guests
    )
    
    process.start()

if __name__ == "__main__":
    # Example usage
    run_spider(
        location="New York",
        check_in="2024-03-01",
        check_out="2024-03-05",
        guests="2"
    )