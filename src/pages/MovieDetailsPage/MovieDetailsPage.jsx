// import { useEffect } from "react";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
// import getFilmById from '';

export default function MovieDetailsPage({ filmById, setFilmId }) {
  const { movieId } = useParams();
  useEffect(() => {
    setFilmId(movieId);
  }, [movieId, setFilmId]);
  const location = useLocation();
  const backLink = location.state ?? "/movies";

  return (
    <>
      MovieDetailsPage
      <Link to={backLink}>
        <BsBoxArrowLeft />
        Go back
      </Link>
      <p>{filmById.original_title}</p>
      <p>{filmById.backdrop_path}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${filmById.backdrop_path}`}
        alt={filmById.original_title}
      />
      <p>{filmById.overview}</p>
      <p>{filmById.vote_average}</p>
      {filmById.genres && (
        <ul>
          {filmById.genres.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
      <p>
        <Link to={`/movies/${movieId}/cast`}>cast??</Link>
      </p>
      <p>
        <Link to={`/movies/${movieId}/reviews`}>reviews??</Link>
      </p>
      <Outlet />
    </>
  );
}
