import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [count, setCount] = useState(0);
  const [currentMovie, setCurrentMovie] = useState("");
  const [search, setSearch] = useState("");

  const [movies, setMovies] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);
  const [movieError, setMovieError] = useState("");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [postSearch, setPostSearch] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Movies API
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        return response.json();
      })
      .then((data) => {
        setMovies(
          data.products.slice(0, 10).map((item) => ({
            id: item.id,
            title: item.title,
            rating: item.rating,
            image: item.thumbnail,
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

  // Posts API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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

      <p>Search: {search}</p>

      <h2>Movies 🎬</h2>

      {movieLoading && <p>Loading Movies...</p>}

      {movieError && <p>{movieError}</p>}

      {!movieLoading &&
        !movieError &&
        movies
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
              onWatch={() => handleWatch(movie.title)}
              onFavorite={() => handleFavorite(movie)}
              isFavorite={favorites.some(
                (fav) => fav.id === movie.id
              )}
            />
          ))}

      {/* Watch Count */}
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

      {/* Favorites */}
      <h2>Favorites ❤️</h2>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        favorites.map((movie) => (
          <p key={movie.id}>
            ❤️ {movie.title} - {movie.rating}/10
          </p>
        ))
      )}

      {/* Posts API */}
      <h2>API Posts</h2>

      <input
        type="text"
        placeholder="Search posts..."
        value={postSearch}
        onChange={(e) => setPostSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading &&
        !error &&
        posts
          .filter((post) =>
            post.title
              .toLowerCase()
              .includes(postSearch.toLowerCase())
          )
          .slice(0, 5)
          .map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
    </div>
  );
}

export default App;