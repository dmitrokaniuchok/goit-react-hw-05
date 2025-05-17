import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../../apiKey";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      setIsLoading(true);
      try {
        const results = await searchMovies(query);
        if (results.length === 0) {
          toast.error("There are no movies with this title 😢");
          setMovies([]);
          setInputValue("");
        } else {
          setMovies(results);
          setInputValue("");
        }
      } catch {
        toast.error("Error searching for movies");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.query.value.trim();

    if (!searchValue) {
      toast.error("Enter the title of the movie!");
      return;
    }

    setSearchParams({ query: searchValue });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          className={css.input}
          placeholder="Search movies..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {isLoading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
}
