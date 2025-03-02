const MovieCard = ({ movie, onSelect }) => {
    return (
      <div
        className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-blue-500/50 p-3"
        onClick={() => onSelect(movie.imdbID)}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="p-3">
          <h3 className="text-lg font-bold text-blue-400">{movie.Title}</h3>
          <p className="text-gray-400">{movie.Year}</p>
        </div>
      </div>
    );
  };
  
  export default MovieCard;
  