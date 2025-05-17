import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../../apiKey";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError("Could not load reviews");
        console.error(err);
      }
    }
    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length)
    return (
      <p className={css.noReviews}>
        We do not have any reviews for this movie.
      </p>
    );

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <h4 className={css.author}>Author: {author}</h4>
          <p className={css.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}
