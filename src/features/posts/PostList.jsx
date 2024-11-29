import styles from "./PostList.module.css";
import { getAllPosts } from "../../services/serverOperations";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import PostItem from "./PostItem";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import Logout from "../../ui/Logout";
import { useState } from "react";
import useAuth from "../../context/AuthContext";

function sort(posts, userId, key) {
  if (key === "myPosts") {
    return posts.filter((post) => post.profile.id === userId);
  } else if (key === "old") {
    return posts.sort(
      (post1, post2) => new Date(post1.updatedAt) - new Date(post2.updatedAt)
    );
  } else if (key === "latest") {
    return posts.sort(
      (post1, post2) => new Date(post2.updatedAt) - new Date(post1.updatedAt)
    );
  }
}
function PostList({ outlet }) {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const [selectedOption, setSelectedOption] = useState("latest");
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  if (isLoading) return <Spinner />;

  const sortedPosts = sort(data?.posts, user.id, selectedOption);

  return (
    <div className={`${styles.container} ${outlet ? "blurred" : ""}`}>
      <div className={styles.postBtns}>
        <h3 className={styles.heading}>All Posts</h3>
        <span>
          <span className={styles.sort}>Sort by</span>
          <select
            className={styles.input}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="myPosts">my posts</option>
            <option value="latest">latest</option>
            <option value="old">old</option>
          </select>
        </span>
        <Button onClick={() => navigate("addpost")}>Add Post</Button>
        <Logout />
      </div>
      <main className={styles.postsContainer}>
        {sortedPosts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </main>
    </div>
  );
}

export default PostList;
