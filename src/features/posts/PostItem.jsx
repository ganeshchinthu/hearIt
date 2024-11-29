import { Link } from "react-router-dom";
import styles from "./PostItem.module.css";

function PostItem({ post }) {
  return (
    <Link to={`${post.id}`}>
      <div className={styles.postContainer}>
        {/* <strong>{post.profile.username}</strong> */}
        <h4 className={styles.postTile}>{post?.title}</h4>
        <p className={styles.postDescription}>
          {post?.description.slice(0, 90)}
        </p>
      </div>
    </Link>
  );
}

export default PostItem;
