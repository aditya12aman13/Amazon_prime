import { useState, useEffect } from 'react';
import axios from 'axios';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  const categories = [...new Set(movies.map(m => m.category))];

  return (
    <div className="pb-12 bg-prime-dark min-h-screen">
      <HeroBanner movie={movies[0]} />
      <div className="mt-[-100px] relative z-20">
        {categories.map(category => (
          <MovieRow 
            key={category} 
            title={category} 
            movies={movies.filter(m => m.category === category)} 
          />
        ))}
      </div>
    </div>
  );
}
