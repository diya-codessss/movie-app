function MovieCard({
  title,
  rating,
  onWatch,
  onFavorite,
  isFavorite,
}) {
  return (
    <div>
      <h2>{title}</h2>

      <p>Rating: {rating}/10</p>

      <button onClick={onWatch}>
        Watch Movie
      </button>

      <button onClick={onFavorite}>
        {isFavorite
          ? "❤️ Favorited"
          : "🤍 Add to Favorites"}
      </button>
    </div>
  );
}

export default MovieCard;