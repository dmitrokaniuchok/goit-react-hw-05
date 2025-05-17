import axios from "axios";

const accessToken = import.meta.env.VITE_API_TOKEN;

const POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

const MOVIE_DETAILS_BASE_URL = "https://api.themoviedb.org/3/movie/";

const SEARCH_MOVIES_URL =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const options = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  },
};

export async function getPopularMovies() {
  const response = await axios.get(POPULAR_MOVIES_URL, options);
  return response.data;
}

export async function getMovieById(movie_id) {
  const response = await axios.get(
    `${MOVIE_DETAILS_BASE_URL}${movie_id}?language=en-US`,
    options
  );
  return response.data;
}

export async function getMovieCast(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
}

export async function getMovieReviews(movie_id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}/reviews?language=en-US&page=1`,
    options
  );
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await axios.get(
    `${SEARCH_MOVIES_URL}&query=${query}`,
    options
  );
  return response.data.results;
}
