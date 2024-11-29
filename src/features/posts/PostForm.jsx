import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import styles from "./postForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/serverOperations";
import Error from "../../ui/Error";
import { useForm } from "react-hook-form";
import useAuth from "../../context/AuthContext";
import Spinner from "../../ui/Spinner";

function PostForm({ postData = null }) {
  const queryClient = useQueryClient();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit(data) {
    data.profileId = user.id;

    const createdPost = await createPost(data);

    return createdPost;
  }

  const navigate = useNavigate();

  const { mutate: submitPost, isPending: isCreatingPost } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      navigate("/posts");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  if (isCreatingPost) return <Spinner />;

  return (
    <form className={styles.postForm} onSubmit={handleSubmit(submitPost)}>
      <h4 className={styles.postHeading}>Add Post</h4>

      <div className={styles.textAreaTitle}>
        <textarea
          className={styles.postSubject}
          style={{}}
          rows={1}
          id=""
          placeholder="Subject"
          {...register("title", {
            required: {
              value: true,
              message: "title is required",
            },
          })}
        ></textarea>
        {errors?.title ? <Error>{errors.title?.message}</Error> : null}
      </div>

      <div className={styles.textAreaDescription}>
        <textarea
          className={styles.postDescription}
          name=""
          id=""
          placeholder="Description"
          {...register("description", {
            required: {
              value: true,
              message: "description is required",
            },
          })}
        ></textarea>
        {errors?.description ? (
          <Error>{errors.description?.message}</Error>
        ) : null}
      </div>

      <Button disabled={isSubmitting} p=".7rem 1.2rem" type="submit">
        Submit
      </Button>
      <Button onClick={() => navigate("/posts")} type="button">
        Back
      </Button>
    </form>
  );
}

export default PostForm;
