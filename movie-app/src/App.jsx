import { useState } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const movieName = "The Dark Knight";
  const rating = 9.0;
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>My Movie App</h1>

      <h2>{movieName}</h2>
      <p>Rating: {rating}/10</p>

      <button>Watch Now</button>

      <MovieCard title="Inception" rating={8.8} />

      <p>Watch Count: {count}</p>

      {count > 0 ? (
        <p>Movie is being watched 🎬</p>
      ) : (
        <p>Click Watch to start watching.</p>
      )}

      <button onClick={() => setCount(count + 1)}>
        Watch
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default App;