import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";
import { useSearchParams } from "react-router-dom";
import { getSearchFilms } from "../../films-api";
import s from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchFilm, setSearchFilm] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.searchName.value.trim();

    if (searchValue === "") {
      alert("bad request");
      setSearchFilm([]);

      return;
    }
    setSearchFilm(null);
    setSearchParams({ query: searchValue.toLowerCase() });
    e.target.reset();
  };

  useEffect(() => {
    async function getFilms() {
      if (!query) {
        return;
      }
      try {
        const response = await getSearchFilms(query);
        if (response.length === 0) {
          setSearchFilm([]);
          alert("Films not exist. Change your query.");
          return;
        }
        setSearchFilm(response);
      } catch (error) {
        alert(error);
      }
    }
    getFilms();
  }, [query]);

  return (
    <>
      <Navigation />

      <form onSubmit={handleSubmit}>
        <input
          className={s.movies_page_inp}
          type="text"
          name="searchName"
          id=""
        />
        <button className={s.movies_page_btn} type="submit">
          search
        </button>
      </form>
      {searchFilm ? <MovieList films={searchFilm} /> : <div>Loading...</div>}
    </>
  );
}
