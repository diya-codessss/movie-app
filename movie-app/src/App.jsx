import { useState } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const movies = [
    { id: 1, title: "The Dark Knight", rating: 9.0 },
    { id: 2, title: "Inception", rating: 8.8 },
    { id: 3, title: "Interstellar", rating: 8.7 }
  ];

  return (
    <div>
      <h1>My Movie App</h1>

      <input
        type="text"
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>Search: {search}</p>

     {movies
  .filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((movie) => (
    <MovieCard
      key={movie.id}
      title={movie.title}
      rating={movie.rating}
    />
  ))}

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