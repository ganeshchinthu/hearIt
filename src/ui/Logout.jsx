import useAuth from "../context/AuthContext";
import styles from "./Logout.module.css";

function Logout() {
  const { logout } = useAuth();
  return (
    <button className={styles.logout} onClick={() => logout()}>
      Logout
    </button>
  );
}

export default Logout;
