import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import useAuth from "../../context/AuthContext";
import { useEffect } from "react";

function LoginForm({ newUser = false }) {
  const { login, getCurrentUser, error: authError } = useAuth();

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
    const loginError = authError?.loginUserError;

    if (loginError) {
      setError("email", { type: "auth", message: loginError });
    }
  }, [authError, setError]);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate("/posts", { replace: true });
    }
  }, [getCurrentUser, navigate]);

  async function onSubmit(data) {
    await login(data);
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h3 className={styles.formHeading}>
            {newUser ? "Sign Up" : "Sign In"}
          </h3>
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
            // type="submit"
            size="2.2rem"
            p="0.8rem 1.2rem"
            boradius=".5rem"
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
          >
            Submit
          </Button>

          {!newUser && (
            <Link to="/newuser">
              <Button size="2.2rem" p="0.8rem 1.2rem" boradius=".5rem">
                New User
              </Button>
            </Link>
          )}

          {newUser && (
            <Link to="/userlogin">
              <Button size="2.2rem" p="0.8rem 1.2rem" boradius=".5rem">
                Back
              </Button>
            </Link>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginForm;
