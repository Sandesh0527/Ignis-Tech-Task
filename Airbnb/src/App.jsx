import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResults from './pages/SearchResults';
import ListingDetails from './pages/ListingDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<SearchResults />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;