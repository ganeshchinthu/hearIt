import { Outlet, useOutlet } from "react-router-dom";
import PostList from "../features/posts/PostList";
import PostLayout from "../ui/PostLayout";

function Posts() {
  const outlet = useOutlet();
  const value = outlet ? true : false;
  return (
    <PostLayout outlet={value}>
      <PostList outlet={value} />
      <Outlet />
    </PostLayout>
  );
}

export default Posts;
