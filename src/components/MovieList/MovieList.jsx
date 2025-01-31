import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FcAdvance } from "react-icons/fc";
import s from "./MovieList.module.css";

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <>
      <ul className={s.movie_list}>
        {films.map((item) => (
          <li key={item.id}>
            <Link
              to={`/movies/${item.id}`}
              state={location}
              className={s.movie_list_item}
            >
              <FcAdvance className={s.movie_list_item_svg} />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
