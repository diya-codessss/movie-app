function App() {
  const movieName = "The Dark Knight";
  const rating = 9.0;

  return (
    <div>
      <h1>My Movie App</h1>
      <h2>{movieName}</h2>
      <p>Rating: {rating}/10</p>
    </div>
  );
}

export default App;