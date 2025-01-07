import { useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage({ getSearchFilm, searchFilm }) {
  // const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("e.target.value", e.target.elements.searchName.value);
    const searchValue = e.target.elements.searchName.value.trim();

    if (searchValue === "") {
      alert("bad request");
      return;
    }
    getSearchFilm(searchValue.toLowerCase());
    e.target.reset();
  };
  return (
    <>
      <p>MoviesPage</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchName" id="" />
        <button type="submit">search</button>
      </form>
      {searchFilm.length > 0 && (
        <MovieList films={searchFilm} location={location} />
      )}
    </>
  );
}
