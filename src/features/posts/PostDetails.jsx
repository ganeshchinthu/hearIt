import styles from "./PostDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../ui/Button";

import {
  deletePost,
  getPost,
  updatePost,
} from "../../services/serverOperations";

import Spinner from "../../ui/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import PostActionButtons from "./PostActionButtons";
import useAuth from "../../context/AuthContext";

function PostDetails() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(true);
  const { getCurrentUser } = useAuth();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const queryClient = useQueryClient();

  const { postId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const { data, isPending } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPost(postId),
  });

  const { mutate: onEdit, isPending: isUpdating } = useMutation({
    mutationFn: handlePostEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      navigate("/posts");
    },
  });

  async function handlePostEdit() {
    if (!isEdited) {
      const newData = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        createdAt: data.createdAt,
      };

      await updatePost(newData, postId);
    }

    setIsEdited((state) => !state);
  }

  async function handleDelete() {
    onDelete(postId);
  }

  function handleDialog() {
    setIsDialogOpen((state) => !state);
  }

  if (isPending) return <Spinner />;

  // const [isUser, isModerator, isAdmin] = userPermissions(user, data?.post);

  return (
    <div className={styles.postContainer}>
      <h3 className={styles.postUsername}>@{data.post.profile.username}</h3>
      <div className={styles.postContent}>
        <textarea
          ref={titleRef}
          disabled={isEdited || isUpdating}
          rows={1}
          className={styles.postHeading}
        >
          {data.post.title}
        </textarea>
        <textarea
          ref={descriptionRef}
          disabled={isEdited || isUpdating}
          className={styles.postDescription}
        >
          {data.post.description}
        </textarea>
      </div>
      <div className={styles.postActionBtns}>
        <PostActionButtons
          handleDelete={handleDelete}
          handleDialog={handleDialog}
          onEdit={onEdit}
          currentUser={user}
          post={data?.post}
          isDialogOpen={isDialogOpen}
        />
      </div>
      <Button type="button" onClick={() => navigate("/posts")}>
        Back
      </Button>
    </div>
  );
}

export default PostDetails;
