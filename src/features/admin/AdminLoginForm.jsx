import styles from "./AdminLoginForm.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import Error from "../../ui/Error";
import { useEffect } from "react";
import useAdmin from "../../context/AdminContext";
import useAuth from "../../context/AuthContext";

function AdminLoginForm() {
  const { loginAdmin, isLoading, error: authError } = useAdmin();
  const { getCurrentUser } = useAuth();
  const navigate = useNavigate();

  const user = getCurrentUser();

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
    if (authError?.adminLoginError) {
      setError("email", { type: "auth", message: authError?.adminLoginError });
    }
  }, [authError, setError]);

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  async function onSubmit(data) {
    await loginAdmin(data);
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h3 className={styles.formHeading}>Sign In</h3>
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
        </form>
      </div>
    </>
  );
}

export default AdminLoginForm;
