import styles from "./NewUserForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import useAuth from "../../context/AuthContext";
import { useEffect } from "react";

function NewUserForm() {
  const { createUser, getCurrentUser, error: authError } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    const createError = authError?.createUserError;
    if (createError === "Username taken") {
      setError("username", {
        type: "auth",
        message: createError,
      });
    }

    if (createError === "User exist") {
      setError("email", {
        type: "auth",
        message: createError,
      });
    }
  }, [authError, setError]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate("/posts", { replace: true });
    }
  }, [getCurrentUser, navigate]);

  async function onSubmit(data) {
    await createUser(data);
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h3 className={styles.formHeading}>Sign Up</h3>

          <div className={styles.fieldContainer}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              placeholder="john@example.com"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "username is required",
                },
              })}
            />
            {errors?.username ? (
              <Error>{errors.username?.message}</Error>
            ) : null}
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
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },

                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors?.email ? <Error>{errors.email?.message}</Error> : null}
          </div>
          <div className={styles.fieldContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              className={styles.input}
              placeholder="john56@a"
              id="password"
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors?.password ? (
              <Error>{errors.password?.message}</Error>
            ) : null}
          </div>

          <Button
            size="2.2rem"
            p="0.8rem 1.2rem"
            boradius=".5rem"
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
          >
            Submit
          </Button>

          <Link to="/userlogin">
            <Button
              size="2.2rem"
              p="0.8rem 1.2rem"
              boradius=".5rem"
              type="button"
            >
              Back
            </Button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default NewUserForm;
