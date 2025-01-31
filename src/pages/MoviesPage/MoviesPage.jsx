import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";
import Loading from "../../components/Loading/Loading";
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
      toast.error("bad request");
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
          toast.error("Films not exist. Change your query.");
          return;
        }
        setSearchFilm(response);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getFilms();
  }, [query]);

  return (
    <>
      <Navigation />

      <form onSubmit={handleSubmit} className={s.movies_page_form}>
        <input
          className={s.movies_page_inp}
          type="text"
          name="searchName"
          placeholder="enter the name of movie"
        />
        <button className={s.movies_page_btn} type="submit">
          search
        </button>
      </form>
      {searchFilm ? (
        searchFilm.length > 0 && (
          <div
            className={s.movies_page_home_page_wrapper}
            style={{
              background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(https://image.tmdb.org/t/p/original${searchFilm[0].backdrop_path}) center/cover fixed`,
            }}
          >
            <MovieList films={searchFilm} />
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
}
