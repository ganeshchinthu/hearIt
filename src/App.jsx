import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import UserLogin from "./pages/UserLogin";
import NewUser from "./pages/NewUser";
import Posts from "./pages/Posts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./features/posts/PostDetails";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./pages/Admin";
import AdminLoginForm from "./features/admin/AdminLoginForm";
import { AdminProvider } from "./context/AdminContext";
import AdminUserStatusForm from "./features/admin/AdminUserStatusForm";
import AdminDashboard from "./features/admin/AdminDashboard";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import PostForm from "./features/posts/PostForm";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "userlogin", element: <UserLogin /> },
  { path: "newuser", element: <NewUser /> },
  {
    path: "admin",
    element: (
      <AdminProvider>
        <Admin />
      </AdminProvider>
    ),

    children: [
      { index: true, element: <Navigate to="form" /> },
      {
        path: "form",
        element: <AdminLoginForm />,
      },
      {
        path: "userstatus/:profileId",
        element: (
          <ProtectedAdminRoute>
            <AdminUserStatusForm />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "createuser",
        element: (
          <ProtectedAdminRoute>
            <AdminUserStatusForm adduser={true} />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
  {
    path: "posts",
    element: (
      <ProtectedRoute>
        <Posts />
      </ProtectedRoute>
    ),
    children: [
      { path: ":postId", element: <PostDetails /> },
      { path: "addpost", element: <PostForm /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
