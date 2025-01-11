import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import s from "./MovieGrid.module.css";
import { fetchImages } from "../../about-api";
import clsx from "clsx";
import { toast } from "react-hot-toast";

const MovieGrid = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    async function getImage() {
      try {
        const response = await fetchImages();

        setImages(response.results);
        // console.log("images", response.results);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getImage();
  }, []);

  const gridElemClasses = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  return (
    <div className={s.movie_grid_wrapper}>
      {images ? (
        <ul className={s.movie_grid_list}>
          {images.map((item, index) => (
            <li
              key={item.id}
              className={clsx(s.movie_grid_item, gridElemClasses[index])}
            >
              <img
                className={s.movie_grid_img}
                src={item.urls.small}
                alt={item.description}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MovieGrid;
