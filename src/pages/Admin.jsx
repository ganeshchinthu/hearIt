import { Outlet } from "react-router-dom";
import AdminLayout from "../ui/AdminLayout";

function Admin() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default Admin;
