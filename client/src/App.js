import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
        console.log('Movies loaded:', data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Loading movies...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <p>Total movies: {movies.length}</p>
        <div style={{ textAlign: 'left', maxHeight: '400px', overflowY: 'auto' }}>
          {movies.map(movie => (
            <div key={movie.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
              <strong>ID:</strong> {movie.id} | <strong>Title:</strong> {movie.title}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
