import { Link } from "react-router-dom";

export default function MovieList({ films, location }) {
  return (
    <>
      <div>MovieList</div>
      <ul>
        {films.map((item) => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
