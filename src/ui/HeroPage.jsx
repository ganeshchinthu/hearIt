import { Link } from "react-router-dom";
import styles from "./HeroPage.module.css";
import Logo from "./Logo";

function HeroPage() {
  return (
    <section className={styles.hero}>
      <header className={styles.header}>
        <Logo />
        <nav className={styles.navigation}>
          <Link to="/userlogin">
            <a className={styles.loginBtn}>Login</a>
          </Link>
        </nav>
      </header>

      <div className={styles.headingContainer}>
        <h1 className={styles.headingMain}>
          Want to know more about people hear what they <span>say</span>
        </h1>
      </div>
    </section>
  );
}

export default HeroPage;
