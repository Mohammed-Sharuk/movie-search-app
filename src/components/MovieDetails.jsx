const MovieDetails = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
      {/* Movie Details Container */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-gray-900 text-white rounded-lg shadow-lg p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-700 hover:bg-red-600 text-white p-2 rounded-full transition duration-300"
        >
          ❌
        </button>

        {/* Movie Content */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Movie Poster */}
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full sm:w-1/3 max-h-96 object-cover rounded-md shadow-md"
          />

          {/* Movie Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{movie.Title}</h2>
            <p className="text-gray-400 text-sm md:text-base">{movie.Year}</p>
            <p className="mt-2">
              <span className="font-semibold">IMDB Rating:</span> ⭐ {movie.imdbRating} / 10
            </p>
            <p className="mt-2">
              <span className="font-semibold">Genre:</span> {movie.Genre}
            </p>
            <p className="mt-2 text-gray-300 text-sm sm:text-base">{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
