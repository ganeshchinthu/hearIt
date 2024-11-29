import styles from "./AdminUserStatusForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  getProfile,
  updateProfile,
} from "../../services/serverOperations";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";

function AdminUserStatusForm({ adduser = false }) {
  const { profileId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    email: "",
    password: "",
  });

  async function handleSubmitForm(data) {
    if (adduser) {
      await createUser(data);
    } else {
      await updateProfile(data, profileId);
    }
  }

  const { data, isPending } = useQuery({
    queryKey: ["user", profileId],
    queryFn: () => getProfile(profileId),
    enabled: adduser ? false : true,
  });

  const { isPending: isUpdatingProfile, mutate: onSubmit } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user", profileId],
      });

      navigate("/admin/dashboard");
    },
  });

  const { isPending: isCreatingProfile, mutate: onSubmit1 } = useMutation({
    mutationFn: handleSubmitForm,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profiles"],
      });

      navigate("/admin/dashboard");
    },

    onError: (err) => {
      if (err.message === "Username taken") {
        setError("username", { type: "auth", message: err.message });
      } else if (err.message === "User exist") {
        setError("email", { type: "auth", message: err.message });
      }
    },
  });

  if (
    (!adduser && isPending) ||
    isUpdatingProfile ||
    isCreatingProfile ||
    isSubmitting
  )
    return <Spinner />;

  return (
    <>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(adduser ? onSubmit1 : onSubmit)}
        >
          <h3 className={styles.formHeading}>
            {adduser ? "Create User" : "Change Permissions"}
          </h3>
          <div className={styles.fieldContainer}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="john@example.com"
              id="email"
              {...register("username")}
              value={data?.profile.username}
              disabled={adduser ? false : true}
            />
            {errors?.username && <Error>{errors?.username.message}</Error>}
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              placeholder="john@example.com"
              id="email"
              {...register("email")}
              value={data?.profile.email}
              disabled={adduser ? false : true}
            />
            {errors?.email && <Error>{errors?.email.message}</Error>}
          </div>

          <div className={styles.fieldContainer}>
            <label htmlFor="role" className={styles.label}>
              Role
            </label>
            <select
              id="role"
              className={styles.input}
              {...register("role", {
                required: {
                  value: true,
                  message: "role is required",
                },
              })}
              defaultValue={data?.profile.role}
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
            {errors?.role && <Error>{errors?.role.message}</Error>}
          </div>

          <div className={styles.fieldContainer}>
            <label htmlFor="status" className={styles.label}>
              Status
            </label>
            <select
              className={styles.input}
              id="status"
              {...register("status", {
                required: {
                  value: true,
                  message: "status is required",
                },
              })}
              defaultValue={data?.profile.status}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {errors?.status && <Error>{errors?.status.message}</Error>}
          </div>

          <Button
            size="2rem"
            p=".5rem 1rem"
            boradius=".5rem"
            disabled={
              (!adduser && isPending) ||
              !isDirty ||
              !isValid ||
              isUpdatingProfile ||
              isCreatingProfile ||
              isSubmitting
            }
            type="submit"
          >
            Submit
          </Button>

          <Button
            size="1.9rem"
            p=".5rem 1rem"
            boradius=".5rem"
            type="button"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back
          </Button>
        </form>
      </div>

      <DevTool control={control} />
    </>
  );
}

export default AdminUserStatusForm;
