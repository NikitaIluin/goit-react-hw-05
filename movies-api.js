import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common.Authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjI2MTgwYjRiNDBlN2JlYjUwOWEyM2RjYjgyNjQyOSIsInN1YiI6IjY2NWY1YTJmMjY1MWUyNmE2NDA5MDMzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XAEjrNFGiMTGl-AMjGVub1ObI7GCLn60c8HA8VYASyI";
axios.defaults.params = { language: "en-US" };

// // "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

export const getTrendingMovies = async () => {
  const response = await axios.get("trending/movie/day");
  return response.data.results;
};

export const getSearchMovies = async (query) => {
  const response = await axios.get(`search/movie?query=${query}`);
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id) => {
  const response = await axios.get(`movie/${id}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (id) => {
  const response = await axios.get(`movie/${id}/reviews`);
  return response.data.results;
};

// export const getMovies = async () => {
//   const response = await axios.get("/trending/movie/day", options);
//   return response.data;
// };

// export const getSearchMovies = async (query) => {
//   const response = await axios.get("/search/movie", {
//     params: {
//       query: query,
//     },
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjI2MTgwYjRiNDBlN2JlYjUwOWEyM2RjYjgyNjQyOSIsInN1YiI6IjY2NWY1YTJmMjY1MWUyNmE2NDA5MDMzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XAEjrNFGiMTGl-AMjGVub1ObI7GCLn60c8HA8VYASyI",
//     },
//   });
//   return response.data.results;
// };

// export const getDetails = async (movieId) => {
//   const response = await axios.get(`/movie/${movieId}`, options);
//   return response.data;
// };

// export const getCastMovie = async (movieId) => {
//   const response = await axios.get(`/movie/${movieId}/credits`, options);
//   return response.data.cast;
// };

// export const getReviewsMovie = async (movieId) => {
//   const response = await axios.get(`/movie/${movieId}/reviews`, options);
//   return response.data.results;
// };