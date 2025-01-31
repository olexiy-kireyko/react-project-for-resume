import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import clsx from "clsx";
import { getCastById } from "../../films-api";
import s from "./MovieCast.module.css";
import Loading from "../Loading/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MovieCast() {
  const galleryCast = useRef();

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

  useEffect(() => {
    if (!castFilmById) {
      return;
    } else {
      galleryCast.current.scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }, [castFilmById]);

  if (!castFilmById) {
    return <Loading />;
  }

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <>
      {castFilmById.length > 0 ? (
        <div className={clsx("slider-container", s.movie_cast_list)}>
          <Slider {...settings}>
            {castFilmById.map((item) => {
              return (
                <div className={s.movie_cast} key={item.id}>
                  <img
                    className={s.movie_cast_img}
                    src={
                      item.profile_path
                        ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                        : defaultImg
                    }
                    alt={item.character}
                  />
                  <p>
                    <span className={s.movie_cast_span}>name:</span> {item.name}{" "}
                  </p>
                  <p>
                    <span className={s.movie_cast_span}>character:</span>{" "}
                    {item.character}{" "}
                  </p>
                  <div></div>
                </div>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div>There are no cast in this movie...</div>
      )}
      <div ref={galleryCast}></div>
    </>
  );
}
