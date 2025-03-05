import { useState, useCallback } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";

const API_URL = "https://www.omdbapi.com/?apikey=9d67ccb8"; // Correct API URL

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to search movies
  const searchMovies = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}&s=${searchTerm}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError("No movies found.");
      }
    } catch (error) {
      setError("Failed to fetch movies. Please try again.");
    }

    setLoading(false);
  };

  // Optimized function to fetch movie details
  const fetchMovieDetails = useCallback(async (id) => {
    setDetailLoading(true);
    try {
      const response = await axios.get(`${API_URL}&i=${id}`);
      if (response.data.Response === "True") {
        setSelectedMovie(response.data);
      } else {
        setSelectedMovie(null);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setSelectedMovie(null);
    }
    setDetailLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-4xl font-bold text-center text-blue-400 drop-shadow-md">
        Movie Search App
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search for movies..."
          className="p-3 w-full max-w-lg text-black rounded-l-md shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button
          className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-all shadow-md"
          onClick={searchMovies}
        >
          🔍
        </button>
      </div>

      {/* Error & Loading Messages */}
      {loading && <p className="text-center mt-4 text-blue-300">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Movie Grid - Fix layout */}
      <div className="w-full mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} onSelect={fetchMovieDetails} />
            ))
          ) : (
            !loading &&
            !error && (
              <p className="text-center col-span-full text-gray-400">
                Search for movies above!
              </p>
            )
          )}
        </div>
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          loading={detailLoading}
        />
      )}
    </div>
  );
};

export default Home;
