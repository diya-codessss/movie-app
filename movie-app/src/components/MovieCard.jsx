function MovieCard({ title, rating, onWatch, onFavorite }) {
  return (
    <div>
      <h2>{title}</h2>

      <p>Rating: {rating}/10</p>

      <button onClick={onWatch}>
        Watch Movie
      </button>

      <button onClick={onFavorite}>
        ❤️ Add / Remove Favorite
      </button>
    </div>
  );
}

export default MovieCard;