function MovieCard({
  title,
  rating,
  image,
  description,
  onWatch,
  onFavorite,
  isFavorite,
  isWatched,
}) {
  return (
    <div className="movie-card">

      <img
        src={image}
        alt={title}
      />

      <h2>{title}</h2>

      <p>⭐ Rating: {rating}/10</p>

      <p>{description}</p>

     <button
  className={isWatched ? "watch-btn watched" : "watch-btn"}
  onClick={onWatch}
>
  {isWatched ? "✓ Watching" : "🎬 Watch Movie"}
</button>

      <button
        className="favorite-btn"
        onClick={onFavorite}
      >
        {isFavorite
          ? "❤️ Favorited"
          : "🤍 Add to Favorites"}
      </button>

    </div>
  );
}

export default MovieCard;