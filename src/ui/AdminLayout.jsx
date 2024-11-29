import styles from "./AdminLayout.module.css";

function AdminLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default AdminLayout;
