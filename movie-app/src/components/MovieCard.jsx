function MovieCard({ title, rating, onWatch }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Rating: {rating}/10</p>

      <button onClick={onWatch}>
        Watch Movie
      </button>
    </div>
  );
}

export default MovieCard;