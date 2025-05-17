import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.item}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={css.link}
          >
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={title}
              className={css.poster}
            />
            <p className={css.title}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
