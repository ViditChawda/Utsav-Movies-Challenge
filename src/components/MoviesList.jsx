import { useState, useEffect } from 'react';
import styles from './Landing.module.scss'
import { BsSearch } from 'react-icons/bs'

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
            <form className={styles.search} action="/search" method="get">
                <button className={styles.btn} type="submit"><BsSearch /></button>
                <input className={styles.searchBar} type="text" name="q" placeholder="Search Movies...." />

            </form>
            <h1 className={styles.heading} id="toprated">Top Rated Movies</h1>
            <div className={styles.movieContainer} >
                {topRatedMovies.map((movie) => (
                    <div key={movie.id} className={styles.cardContainer}>
                        <div className={styles.title}>{movie.title}</div>
                        <img className={styles.image} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} width={500} height={750} />
                        <div className={styles.overview}>{movie.overview}</div>
                    </div>
                ))}
            </div>

            <h1 className={styles.heading} id="popular">Popular Movies</h1>
            <div className={styles.movieContainer} >
                {popularMovies.map((movie) => (
                    <div className={styles.cardContainer} key={movie.id}>
                        <div className={styles.title}>{movie.title}</div>
                        <img className={styles.image} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} width={500} height={750} />
                        <div className={styles.overview}>{movie.overview}</div>
                    </div>
                ))}
            </div>

            <h1 className={styles.heading} id="upcoming">Upcoming Movies</h1>
            <div className={styles.movieContainer} >
                {upcomingMovies.map((movie) => (
                    <div className={styles.cardContainer} key={movie.id}>
                        <div className={styles.title}>{movie.title}</div>
                        <img className={styles.image} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} width={500} height={750} />
                        <div className={styles.date}>Release Date : {movie.release_date}</div>
                        <div className={styles.overview}>{movie.overview}</div>

                    </div>
                ))}
            </div>
        </div>
    );
}
