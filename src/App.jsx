import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const API_URL = "https://www.omdbapi.com/?apikey=9d67ccb8";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch movies
  const searchMovies = async (query) => {
    if (!query.trim()) return; // Avoid empty search
    setLoading(true);
    const response = await fetch(`${API_URL}&s=${query}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setLoading(false);
  };

  // Fetch trending movies on first load
  useEffect(() => {
    searchMovies("Avengers"); // Default movies to show
  }, []);

  // Fetch movie details only if not already selected
  const fetchMovieDetails = async (imdbID) => {
    if (selectedMovie && selectedMovie.imdbID === imdbID) return; // Avoid refetching

    setLoading(true);
    const response = await fetch(`${API_URL}&i=${imdbID}&plot=full`); // Fetch full details
    const data = await response.json();
    setSelectedMovie(data);
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-5">
      {/* Search Bar */}
      <div className="flex justify-center my-5">
        <div className="relative w-2/3 md:w-1/2">
          <input
            type="text"
            placeholder="Find your favorite movies..."
            className="w-full px-5 py-3 rounded-full bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchMovies(searchTerm)}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition duration-300"
            onClick={() => searchMovies(searchTerm)}
          >
            🔎 {/* Unique search icon */}
          </button>
        </div>
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onSelect={fetchMovieDetails} />
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">
            {loading ? "Loading movies..." : "No movies found."}
          </p>
        )}
      </div>

      {/* Movie Details Popup */}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} loading={loading} />
      )}
    </div>
  );
};

export default App;
