// https://api.themoviedb.org/3/movie/{movie_id}/credits

// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

export default function MovieCast({ castFilmById }) {
  // const { movieId } = useParams();
  // useEffect(() => {
  //   setFilmId(movieId);
  // }, [movieId, setFilmId]);
  return (
    <>
      <p>MovieCast</p>
      <ul>
        {castFilmById.map((item) => {
          return (
            <li key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                alt={item.character}
              />
              name: {item.name} <p>character:{item.character} </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
