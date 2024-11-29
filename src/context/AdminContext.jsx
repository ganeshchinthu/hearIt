import { createContext, useContext, useReducer } from "react";
import { adminLogin } from "../services/serverOperations";

const AdminContext = createContext();

const intialState = {
  error: {},
  isLoading: false,
  admin: {},
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

function AdminProvider({ children }) {
  const [{ admin, isLoading, error }, dispatch] = useReducer(
    reducer,
    intialState
  );

  async function loginAdmin(data) {
    try {
      dispatch({ type: "loading" });
      const user = await adminLogin(data);

      sessionStorage.removeItem("currentUser");
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      dispatch({ type: "login", payload: user });
    } catch (err) {
      dispatch({ type: "error", payload: { adminLoginError: err.message } });
    }
  }

  return (
    <AdminContext.Provider value={{ loginAdmin, isLoading, error, admin }}>
      {children}
    </AdminContext.Provider>
  );
}

function useAdmin() {
  const context = useContext(AdminContext);
  if (!context)
    throw new Error("AdminContext was used outside the Admin provider");

  return context;
}

export default useAdmin;
export { AdminProvider };
