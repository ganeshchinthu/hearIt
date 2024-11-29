import styles from "./PostLayout.module.css";

function PostLayout({ children, outlet }) {
  return (
    <div className={`${styles.container}`}>
      {children}

      {outlet && <div className={styles.overlay}></div>}
    </div>
  );
}

export default PostLayout;
