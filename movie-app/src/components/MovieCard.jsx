function MovieCard({ title, rating }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Rating: {rating}/10</p>
    </div>
  );
}

export default MovieCard;