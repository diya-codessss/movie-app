import { useState } from "react";

function MovieCard({ title, rating, onWatch }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <div>
      <h2>{title}</h2>
      <p>Rating: {rating}/10</p>

      <button onClick={onWatch}>
        Watch Movie
      </button>

      <button onClick={() => setFavorite(!favorite)}>
        {favorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>

      {favorite && <p>❤️ {title} added to favorites!</p>}
    </div>
  );
}

export default MovieCard;