import { useState, useEffect } from "react";
import { getPopularMovies } from "../../../apiKey";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        setError(error.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={css.box}>
      <h1 className={css.title}>Trending today</h1>

      {loading && <strong>Loading...</strong>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}
