import { useState, useEffect } from 'react';
import styles from './Landing.module.scss'

const API_KEY = 'db75be3f6da59e6c54d0b9f568d19d16';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieList() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const [topRatedResponse, popularResponse, upcomingResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`),
      ]);

      const topRatedJson = await topRatedResponse.json();
      setTopRatedMovies(topRatedJson.results);

      const popularJson = await popularResponse.json();
      setPopularMovies(popularJson.results);

      const upcomingJson = await upcomingResponse.json();
      setUpcomingMovies(upcomingJson.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Top Rated Movies</h1>
      <div className={styles.movieContainer}>
        {topRatedMovies.map((movie) => (
          <div key={movie.id} className={styles.cardContainer}>
            <img className={styles.image} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} width={500} height={750} />
            <div className={styles.title}>{movie.title}</div>
            <div className={styles.overview}>{movie.overview}</div>
          </div>
        ))}
      </div>

      <h1 className={styles.heading}>Popular Movies</h1>
      <div className={styles.movieContainer}>
        {popularMovies.map((movie) => (
          <div className={styles.cardContainer} key={movie.id}>
            <img className={styles.image} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} width={500} height={750} />
            <div className={styles.title}>{movie.title}</div>
            <div className={styles.overview}>{movie.overview}</div>
          </div>
        ))}
      </div>

      <h1 className={styles.heading}>Upcoming Movies</h1>
      <div className={styles.movieContainer}>
        {upcomingMovies.map((movie) => (
          <div className={styles.cardContainer} key={movie.id}>
            <img className={styles.image} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} width={500} height={750} />
            <div className={styles.title}>{movie.title}</div>
            <div className={styles.overview}>{movie.overview}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
