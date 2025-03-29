import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/?${params.toString()}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <Link to="/" className="flex items-center">
            <svg className="h-8 w-auto text-airbnb" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.147c1.76-2.317 4.39-3.205 7.026-2.251 2.517.913 4.184 3.307 4.184 5.931 0 2.625-1.667 5.019-4.184 5.932-2.637.954-5.266.066-7.026-2.251-1.76 2.317-4.39 3.205-7.026 2.251C2.457 10.846.79 8.452.79 5.827c0-2.624 1.667-5.018 4.184-5.931C7.61-1.058 10.24-.17 12 2.147z"/>
            </svg>
            <span className="ml-2 text-2xl font-bold text-airbnb">airbnb</span>
          </Link>

          <div className="flex-1 flex justify-center items-center">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="flex items-center bg-white border rounded-full shadow-sm hover:shadow-md transition-shadow px-2">
                <input
                  type="text"
                  placeholder="Where to?"
                  className="px-4 py-2 w-48 focus:outline-none rounded-full"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                />
                <div className="h-8 border-l mx-2"></div>
                <input
                  type="date"
                  className="px-4 py-2 w-36 focus:outline-none"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                />
                <div className="h-8 border-l mx-2"></div>
                <input
                  type="date"
                  className="px-4 py-2 w-36 focus:outline-none"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                />
                <div className="h-8 border-l mx-2"></div>
                <div className="flex items-center space-x-2 px-4">
                  <input
                    type="number"
                    min="1"
                    placeholder="Guests"
                    className="w-16 focus:outline-none"
                    value={searchParams.guests}
                    onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })}
                  />
                  <button 
                    type="submit"
                    className="bg-airbnb text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
              Become a Host
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;