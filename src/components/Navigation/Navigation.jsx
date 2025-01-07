import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

export default function Navigation() {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.navigation_link, isActive && s.active);
  };
  return (
    <nav className={s.navigation}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={buildLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
}
