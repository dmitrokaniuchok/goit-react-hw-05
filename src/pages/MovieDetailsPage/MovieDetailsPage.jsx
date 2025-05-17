import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../../../apiKey";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from || "/movies";

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (err) {
        setError("❌ Error");
        console.error(err);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (error) return <p className={css.error}>{error}</p>;
  if (!movie) return <Loader />;

  const posterUrl = movie.poster_path
    ? `${IMG_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className={css.container}>
      <Link to={backLink} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.content}>
        <img src={posterUrl} alt={movie.title} className={css.poster} />

        <div className={css.details}>
          <h1 className={css.title}>{movie.title}</h1>
          {movie.genres?.length > 0 && (
            <p className={css.genres}>
              <span className={css.label}>Genres:</span>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}
          <p className={css.overview}>
            <span className={css.label}>Overview:</span> {movie.overview}
          </p>
          <p className={css.rating}>
            <span className={css.label}>Rating:</span> {movie.vote_average}
          </p>
          <p className={css.releaseDate}>
            <span className={css.label}>Release:</span> {movie.release_date}
          </p>
        </div>
      </div>

      <hr className={css.hrLine} />
      <h3 className={css.additionalInfoTitle}>Additional information:</h3>
      <ul className={css.additionalList}>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>
      <hr className={css.hrLine} />
      <Outlet />
    </div>
  );
}
