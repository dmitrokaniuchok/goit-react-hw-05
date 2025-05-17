import css from "./Navigation.module.css";
import { BsSearch } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className={css.navigation}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ""}`
        }
      >
        <IoHomeOutline className={css.icon} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/movies"
        end
        className={({ isActive }) =>
          `${css.link} ${isActive ? css.active : ""}`
        }
      >
        <BsSearch className={css.icon} />
        <span>More movies</span>
      </NavLink>
    </nav>
  );
}
