import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import Navigation from "../../components/Navigation/Navigation";
import s from "./AboutPage.module.css";
import { getHomePageFilms } from "../../films-api";
import { toast } from "react-hot-toast";

const AboutPage = () => {
  const [aboutPageFilms, setAboutPageFilms] = useState(null);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await getHomePageFilms();
        setAboutPageFilms(response);
        // console.log("response about page", response);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchFilms();
  }, []);

  return (
    <>
      <Navigation />
      <div className={s.about_page_title_wrapper}>
        <h3 className={s.about_page_title}>Films Application:</h3>
        <p className={s.about_page_text}>
          Our application helps you to see and find list the most popular &
          interecting film, read the reviews and see cast of films.
        </p>
      </div>
      {aboutPageFilms ? (
        <div
          className={s.about_page_wrapper}
          style={{
            background: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(https://image.tmdb.org/t/p/original${aboutPageFilms[1].backdrop_path}) center/cover fixed`,
          }}
        >
          <MovieGrid />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AboutPage;
