import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getListings } from '../api/listings';

function SearchResults() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    minRating: 0
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const params = {
          location: searchParams.get('location'),
          check_in: searchParams.get('checkIn'),
          check_out: searchParams.get('checkOut'),
          guests: searchParams.get('guests'),
          min_price: filters.priceRange[0],
          max_price: filters.priceRange[1],
          min_rating: filters.minRating
        };

        const data = await getListings(params);
        setListings(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [searchParams, filters]);

  const handlePriceRangeChange = (e, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(e.target.value);
    setFilters({ ...filters, priceRange: newRange });
  };

  const handleRatingChange = (e) => {
    setFilters({ ...filters, minRating: parseFloat(e.target.value) });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 py-4 mb-6 overflow-x-auto sticky top-20 bg-white z-40">
          <div className="flex items-center space-x-2 min-w-fit">
            <span className="text-sm font-medium">Price Range:</span>
            <input
              type="number"
              min="0"
              max={filters.priceRange[1]}
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e, 0)}
              className="w-24 px-2 py-1 border rounded"
            />
            <span>-</span>
            <input
              type="number"
              min={filters.priceRange[0]}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e, 1)}
              className="w-24 px-2 py-1 border rounded"
            />
          </div>
          <div className="flex items-center space-x-2 min-w-fit">
            <span className="text-sm font-medium">Min Rating:</span>
            <select
              value={filters.minRating}
              onChange={handleRatingChange}
              className="px-2 py-1 border rounded"
            >
              <option value="0">Any</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="4.5">4.5+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Link 
              key={listing.id} 
              to={`/listing/${listing.id}`}
              className="group"
            >
              <div className="relative aspect-square mb-2">
                <img 
                  src={listing.image_urls[0]} 
                  alt={listing.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <button className="absolute top-3 right-3 p-2 opacity-70 hover:opacity-100">
                  <svg className="w-6 h-6 text-gray-700" fill="white" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">{listing.title}</h3>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="ml-1 text-sm">{listing.ratings}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-1">{listing.location}</p>
                <p className="text-gray-500 text-sm mb-1">{listing.property_type}</p>
                <p className="text-gray-900">
                  <span className="font-semibold">${listing.price_per_night}</span>
                  <span className="text-gray-500"> night</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;