import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getListing } from '../api/listings';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: '',
    checkOut: ''
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListing(id);
        setListing(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 w-1/4 mb-8"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{listing.title}</h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="ml-1 font-medium">{listing.ratings}</span>
              <span className="mx-1">·</span>
              <span className="text-gray-600">{listing.reviews} reviews</span>
            </div>
            <span className="text-gray-600">·</span>
            <span className="text-gray-600">{listing.location}</span>
          </div>
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {listing.image_urls.slice(0, 5).map((url, index) => (
            <div 
              key={index} 
              className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <img 
                src={url}
                alt={`Listing image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
            <div className="flex justify-between items-start pb-6 border-b">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {listing.property_type} hosted by {listing.host_info.name}
                </h2>
                <p className="text-gray-600">
                  Host since {listing.host_info.joined_date}
                </p>
              </div>
              <img 
                src={listing.host_info.avatar || 'https://via.placeholder.com/64'} 
                alt="Host"
                className="w-16 h-16 rounded-full"
              />
            </div>

            <div className="py-8 border-b">
              <h2 className="text-2xl font-semibold mb-6">About this place</h2>
              <p className="text-gray-600 whitespace-pre-line">{listing.description}</p>
            </div>

            <div className="py-8 border-b">
              <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-28">
            <div className="border rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold">${listing.price_per_night}</span>
                  <span className="text-gray-600"> night</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="ml-1">{listing.ratings}</span>
                  <span className="mx-1">·</span>
                  <span className="text-gray-600">{listing.reviews} reviews</span>
                </div>
              </div>

              <div className="border rounded-lg mb-4">
                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 border-r">
                    <label className="block text-xs uppercase font-bold text-gray-600">Check-in</label>
                    <input
                      type="date"
                      className="w-full mt-1 focus:outline-none"
                      value={selectedDates.checkIn}
                      onChange={(e) => setSelectedDates({ ...selectedDates, checkIn: e.target.value })}
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs uppercase font-bold text-gray-600">Check-out</label>
                    <input
                      type="date"
                      className="w-full mt-1 focus:outline-none"
                      value={selectedDates.checkOut}
                      onChange={(e) => setSelectedDates({ ...selectedDates, checkOut: e.target.value })}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs uppercase font-bold text-gray-600">Guests</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full mt-1 focus:outline-none"
                    defaultValue="1"
                  />
                </div>
              </div>

              <button className="w-full bg-airbnb text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Reserve
              </button>

              <div className="mt-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">${listing.price_per_night} × 5 nights</span>
                  <span>${listing.price_per_night * 5}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>$75</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Service fee</span>
                  <span>$95</span>
                </div>
                <div className="flex justify-between pt-4 border-t font-semibold">
                  <span>Total</span>
                  <span>${(listing.price_per_night * 5) + 75 + 95}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;