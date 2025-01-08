import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Navigation from "../../components/Navigation/Navigation";
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
        alert(error);
      }
    }
    fetchFilms();
  }, []);

  return (
    <>
      <Navigation />

      <h3 className={s.home_page_title}>Trending today</h3>
      {homePageFilms ? (
        <MovieList films={homePageFilms} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
