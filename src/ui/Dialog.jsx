import styles from "./Dialog.module.css";

function Dialog({ children, onDelete, onCancel }) {
  return (
    <div className={styles.dialogContainer}>
      <p className={styles.dialogText}>
        Are you sure you want to delete <span>{children}</span>
      </p>

      <div className={styles.btnsContainer}>
        <button onClick={onCancel} className={styles.dialogCancelBtn}>
          Cancel
        </button>
        <button onClick={onDelete} className={styles.dialogDeleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Dialog;
