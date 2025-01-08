import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../../films-api";
import s from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsFilmById, setReviewsFilmById] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await getReviewsById(movieId);
        setReviewsFilmById(response);
      } catch (error) {
        alert(error);
      }
    };
    getReviews();
  }, [movieId]);

  if (!reviewsFilmById) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className={s.movie_reviews_list}>
        {reviewsFilmById.length > 0 ? (
          reviewsFilmById.map((item) => {
            return (
              <li key={item.id}>
                <div className={s.movie_reviews_title}>
                  author: {item.author}
                </div>
                <div>{item.content}</div>
              </li>
            );
          })
        ) : (
          <div>There are no reviews yet...</div>
        )}
      </ul>
    </>
  );
}
