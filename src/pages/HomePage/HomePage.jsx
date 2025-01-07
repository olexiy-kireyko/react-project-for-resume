// import getFilms from "../../films-api";

// import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage({ films }) {
  const location = useLocation();
  return (
    <>
      <h3>Trending today</h3>
      <MovieList films={films} location={location} />
    </>
  );
}
