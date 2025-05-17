import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../../apiKey";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w200";
const FALLBACK_IMG =
  "https://dummyimage.com/150x225/cccccc/000000&text=No+Image";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError("Could not load actors 🙄");
        console.error(err);
      }
    }
    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <Loader />;

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.item}>
          <img
            src={profile_path ? `${IMG_BASE_URL}${profile_path}` : FALLBACK_IMG}
            alt={name}
            className={css.image}
          />
          <p className={css.name}>{name}</p>
          <p className={css.character}>
            <strong>Character: </strong>
            {character}
          </p>
        </li>
      ))}
    </ul>
  );
}
