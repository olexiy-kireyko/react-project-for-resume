import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import Navigation from "../../components/Navigation/Navigation";
import { getFilmById } from "../../films-api";
import s from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [filmById, setFilmById] = useState(null);

  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await getFilmById(movieId);
        setFilmById(response);
      } catch (error) {
        alert(error);
      }
    };
    getFilm();
  }, [movieId]);

  const location = useLocation();
  const backLink = location.state ?? "/movies";

  if (!filmById) {
    return (
      <>
        <Navigation />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Link to={backLink} className={s.movie_details_backlink}>
        <BsBoxArrowLeft />
        Go back
      </Link>
      <div className={s.movie_details_wrapper}>
        <div className={s.movie_maindetails_wrapper}>
          <img
            className={s.movie_img}
            src={`https://image.tmdb.org/t/p/w500${filmById.backdrop_path}`}
            alt={filmById.title}
          />
          <div className={s.movie_infodetails_wrapper}>
            <p className={s.movie_title}>{filmById.title}</p>
            <p className={s.movie_score}>
              User score: {Math.floor(filmById.vote_average * 10)}%
            </p>
            <p>Overview: {filmById.overview}</p>
            <p className={s.movie_genres_title}>Genres: </p>
            {filmById.genres && (
              <ul className={s.movie_genres}>
                {filmById.genres.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <p className={s.movie_add_info}>Additional information</p>
        <ul className={s.movie_add_info_list}>
          <li className={s.movie_add_info_link}>
            <Link to="cast" state={location.state}>
              cast
            </Link>
          </li>
          <li className={s.movie_add_info_link}>
            <Link to="reviews" state={location.state}>
              reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
