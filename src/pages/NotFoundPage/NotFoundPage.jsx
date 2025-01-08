import { Link } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import s from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <p>Page not found...</p>
      <Link className={s.notfound_backlink} to="/">
        <BsBoxArrowLeft />
        Go Home
      </Link>
    </div>
  );
}
