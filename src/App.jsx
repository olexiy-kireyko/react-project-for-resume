import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";
import getFilms from "../src/films-api";

// Ключ API: c8d9d23a04bbef94aa64e07dc0d1d160

//--url 'https://api.themoviedb.org/3/movie/11' \
//url 'https://api.themoviedb.org/3/movie/11/videos'
//url 'https://api.themoviedb.org/3/movie/11?append_to_response=videos'
//url 'https://api.themoviedb.org/3/movie/343611'
//  --header 'Authorization: Bearer eyJhbGciOiJ...

function App() {
  const [homePageFilms, setHomePageFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await getFilms("/trending/movie/day");
        console.log("response", response);

        setHomePageFilms(response.data.results);
      } catch (err) {
        console.log(err);
      }
      // finally {
      // }
    }
    fetchFilms();
  }, []);
  const [filmById, setFilmById] = useState({});
  const [filmId, setFilmId] = useState(0);
  useEffect(() => {
    if (filmId === 0) {
      return;
    }
    const getFilmById = async (id) => {
      try {
        const response = await getFilms(`/movie/${id}`);
        console.log("response with id", response.data);
        setFilmById(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFilmById(filmId);
  }, [filmId]);

  const [castFilmById, setCastFilmById] = useState([]);
  useEffect(() => {
    if (filmId === 0) {
      return;
    }
    const getCastFilmById = async (id) => {
      try {
        const response = await getFilms(`/movie/${id}/credits`);
        console.log("response cast with id", response.data.cast);
        setCastFilmById(response.data.cast);
      } catch (err) {
        console.log(err);
      }
    };
    getCastFilmById(filmId);
  }, [filmId]);

  const [reviewsFilmById, setReviewsFilmById] = useState([]);
  useEffect(() => {
    if (filmId === 0) {
      return;
    }
    const getReviewsFilmById = async (id) => {
      try {
        const response = await getFilms(`/movie/${id}/reviews`);
        console.log("response rev with id", response.data.results);
        setReviewsFilmById(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getReviewsFilmById(filmId);
  }, [filmId]);

  const [searchFilm, setSearchFilm] = useState([]);
  async function getSearchFilm(query) {
    try {
      const response = await getFilms("/search/movie", query);
      console.log("response search", response.data.results);

      setSearchFilm(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage films={homePageFilms} />} />
        <Route
          path="/movies"
          element={
            <MoviesPage getSearchFilm={getSearchFilm} searchFilm={searchFilm} />
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <MovieDetailsPage filmById={filmById} setFilmId={setFilmId} />
          }
        >
          <Route
            path="cast"
            element={<MovieCast castFilmById={castFilmById} />}
          />
          <Route
            path="reviews"
            element={<MovieReviews reviewsFilmById={reviewsFilmById} />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
