import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGQ5ZDIzYTA0YmJlZjk0YWE2NGUwN2RjMGQxZDE2MCIsIm5iZiI6MTczNTkzNTk0OC41NTcsInN1YiI6IjY3Nzg0N2NjYzExZWU2MWRkODc0YjRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5wzQcnNYixXDIWdSVUaXrxLD4zm2jZygd-HBmH_caZE";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;

axios.defaults.headers.common["accept"] = "application/json";

export async function getHomePageFilms() {
  const response = await axios.get("/trending/movie/day", {
    params: { language: "en-US" },
  });
  return response.data.results;
}

export async function getFilmById(id) {
  const response = await axios.get(`/movie/${id}`, {
    params: { language: "en-US" },
  });
  return response.data;
}

export async function getCastById(id) {
  const response = await axios.get(`/movie/${id}/credits`, {
    params: { language: "en-US" },
  });
  return response.data.cast;
}

export async function getReviewsById(id) {
  const response = await axios.get(`/movie/${id}/reviews`, {
    params: { language: "en-US" },
  });
  return response.data.results;
}

export async function getSearchFilms(query) {
  const response = await axios.get("/search/movie", {
    params: { language: "en-US", query },
  });
  return response.data.results;
}
