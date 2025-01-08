import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastById } from "../../films-api";
import s from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [castFilmById, setCastFilmById] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const response = await getCastById(movieId);
        setCastFilmById(response);
      } catch (error) {
        alert(error);
      }
    };
    getCast();
  }, [movieId]);

  if (!castFilmById) {
    return <div>Loading...</div>;
  }

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <>
      <ul className={s.movie_cast_list}>
        {castFilmById.length > 0 ? (
          castFilmById.map((item) => {
            return (
              <li className={s.movie_cast} key={item.id}>
                <img
                  className={s.movie_cast_img}
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                      : defaultImg
                  }
                  alt={item.character}
                />
                <p>name: {item.name} </p>
                <p>character: {item.character} </p>
              </li>
            );
          })
        ) : (
          <div>There are no cast in this movie...</div>
        )}
      </ul>
    </>
  );
}
