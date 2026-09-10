import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

function App() {
  const [count, setCount] = useState(0);
  const [currentMovie, setCurrentMovie] = useState("");
  const [search, setSearch] = useState("");

  const [movies, setMovies] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieError, setMovieError] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
  fetch("https://ghibliapi.vercel.app/films")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      return response.json();
    })
    .then((data) => {
      setMovies(
        data.slice(0, 15).map((item) => ({
          id: item.id,
          title: item.title,
          rating: item.rt_score,
          image: item.image,
          description: item.description,
        }))
      );

      setMovieLoading(false);
    })
    .catch((error) => {
      setMovieError(error.message);
      setMovieLoading(false);
    });
}, []);

  useEffect(() => {
    console.log("Movie App Loaded");
  }, []);

  useEffect(() => {
    console.log("Search changed:", search);
  }, [search]);


  // Save favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleWatch = (movieTitle) => {
    setCount(count + 1);
    setCurrentMovie(movieTitle);
  };

  const handleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const alreadyFavorite = prevFavorites.some(
        (fav) => fav.id === movie.id
      );

      if (alreadyFavorite) {
        return prevFavorites.filter(
          (fav) => fav.id !== movie.id
        );
      }

      return [...prevFavorites, movie];
    });
  };

  return (
    <div>
      <h1>My Movie App 🎬</h1>

      {/* Movie Search */}
      <input
        type="text"
        placeholder="Search movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

     {search && (
  <p className="search-result">
    Searching for: "{search}"
  </p>
)}

      <h2>Movies 🎬</h2>

      {movieLoading && <p>Loading Movies...</p>}

      {movieError && <p>{movieError}</p>}

      {!movieLoading && 
  !movieError && (
    <div className="movies">
      {movies
        .filter((movie) => 
          movie.title
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.rating}
            image={movie.image}
            description={movie.description}
            onWatch={() => handleWatch(movie.title)}
            onFavorite={() => handleFavorite(movie)}
            isFavorite={favorites.some(
              (fav) => fav.id === movie.id
            )}
          />
        ))}
    </div>
  )}

     <div className="watch-section">

  <p>Watch Count: {count}</p>

  {currentMovie && (
    <p>🎬 Currently watching: {currentMovie}</p>
  )}

  {count > 0 ? (
    <p>Movie is being watched 🎬</p>
  ) : (
    <p>Click Watch to start watching.</p>
  )}

  <button onClick={() => setCount(0)}>
    Reset
  </button>

</div>
      {/* Favorites */}
      <h2>Favorites ❤️</h2>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="favorites">
          {favorites.map((movie) => (
            <div className="favorite-card" key={movie.id}>
              <img
                src={movie.image}
                alt={movie.title}
              />

              <div>
                <h3>{movie.title}</h3>
                <p>⭐ Rating: {movie.rating}/10</p>
                <p>{movie.description}</p>
                 <button onClick={() => handleFavorite(movie)}>
                    ❌ Remove from Favorites
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;