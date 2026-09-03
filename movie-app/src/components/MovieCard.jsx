function MovieCard({
  title,
  rating,
  image,
  onWatch,
  onFavorite,
  isFavorite,
}) {
  return (
    <div>
      <img
        src={image}
        alt={title}
        width="200"
      />

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