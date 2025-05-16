import css from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? css.active : "")}
      >
        Home
      </NavLink>
      <Link to="/movies">
        More Movies
        <BsSearch className={css.icon} />
      </Link>
    </nav>
  );
}
