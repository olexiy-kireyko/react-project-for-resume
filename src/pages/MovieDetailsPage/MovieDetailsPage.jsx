import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { FcUndo } from "react-icons/fc";
import { FcExpand } from "react-icons/fc";
import clsx from "clsx";
import Navigation from "../../components/Navigation/Navigation";
import Loading from "../../components/Loading/Loading";
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

  const markCast = location.pathname.includes("cast") ? true : false;
  const markReviews = location.pathname.includes("reviews") ? true : false;

  if (!filmById) {
    return (
      <>
        <Navigation />
        <Loading />
      </>
    );
  }

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <>
      <Navigation />
      <Link to={backLink} className={s.movie_details_backlink}>
        <FcUndo />
        Go back
      </Link>
      <div className={s.movie_details_wrapper}>
        <div className={s.movie_maindetails_wrapper}>
          <img
            className={s.movie_img}
            src={
              filmById.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${filmById.backdrop_path}`
                : defaultImg
            }
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
          <li>
            <Link
              to="cast"
              state={location.state}
              className={s.movie_add_info_link}
            >
              <FcExpand
                className={clsx(
                  !markCast ? s.movie_add_info_svg : s.movie_add_info_svg_open
                )}
              />
              cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={location.state}
              className={s.movie_add_info_link}
            >
              <FcExpand
                className={clsx(
                  !markReviews
                    ? s.movie_add_info_svg
                    : s.movie_add_info_svg_open
                )}
              />
              reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}
