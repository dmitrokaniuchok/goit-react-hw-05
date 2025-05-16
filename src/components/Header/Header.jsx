import css from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={css.container}>
      <Navigation />
    </header>
  );
}
