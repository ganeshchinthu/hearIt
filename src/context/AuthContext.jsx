import { createContext, useContext, useReducer } from "react";
import { login as loginUser, newUser } from "../services/serverOperations";

const AuthContext = createContext();

const intialState = {
  error: {},
  isLoading: false,
  user: {},
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "login":
      return {
        ...state,
        user: payload,
        isLoading: false,
      };

    case "logout":
      return {
        ...intialState,
      };

    case "error":
      return {
        ...state,
        error: { ...state.error, ...payload },
        isLoading: false,
      };

    default:
      throw new Error("Unknow action type");
  }
}

function AuthProvider({ children }) {
  const [{ isLoading, error }, dispatch] = useReducer(reducer, intialState);

  async function login(data) {
    try {
      dispatch({ type: "loading" });
      const user = await loginUser(data);

      sessionStorage.setItem("currentUser", JSON.stringify(user));
      dispatch({ type: "login", payload: user });
      return user;
    } catch (err) {
      dispatch({ type: "error", payload: { loginUserError: err.message } });
    }
  }

  async function createUser(data) {
    try {
      dispatch({ type: "loading" });
      const user = await newUser(data);

      sessionStorage.setItem("currentUser", JSON.stringify(user));
      dispatch({ type: "login", payload: user });
    } catch (err) {
      dispatch({ type: "error", payload: { createUserError: err.message } });
    }
  }

  function logout() {
    sessionStorage.removeItem("currentUser");
    dispatch({ type: "logout" });
  }

  function getCurrentUser() {
    const data = JSON.parse(sessionStorage.getItem("currentUser"));
    const user = data?.profile;
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getCurrentUser,
        error,
        isLoading,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext was used outside the Auth provider");

  return context;
}

export default useAuth;
export { AuthProvider };
