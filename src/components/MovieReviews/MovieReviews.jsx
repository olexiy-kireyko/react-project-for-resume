// https://api.themoviedb.org/3/movie/{movie_id}/reviews

export default function MovieReviews({ reviewsFilmById }) {
  return (
    <>
      MovieReviews
      <ul>
        {reviewsFilmById.map((item) => {
          return (
            <li key={item.id}>
              author: {item.author}; content: {item.content}
            </li>
          );
        })}
      </ul>
    </>
  );
}
