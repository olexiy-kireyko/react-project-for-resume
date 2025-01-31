import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";
import Loading from "../../components/Loading/Loading";
import s from "./HomePage.module.css";
import { getHomePageFilms } from "../../films-api";

export default function HomePage() {
  const [homePageFilms, setHomePageFilms] = useState(null);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await getHomePageFilms();
        setHomePageFilms(response);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFilms();
  }, []);

  return (
    <>
      <Navigation />
      <h3 className={s.home_page_title}>Trending today</h3>
      {homePageFilms ? (
        <div
          className={s.home_page_wrapper}
          style={{
            background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(https://image.tmdb.org/t/p/original${homePageFilms[0].backdrop_path}) center/cover fixed`,
          }}
        >
          <MovieList films={homePageFilms} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
