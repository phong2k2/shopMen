import AdminLayout from "@/layouts/AdminLayout";
import Unauthorized from "@/pages/auth/404/Unauthorized";
import { useSelector } from "react-redux";
// import { Fragment } from "react";

function PrivateRoutes({ children }) {
  let Layout;
  const user = useSelector((state) => state.auth.login.currentUser);

  const roleAdmin = user?.data?.isAdmin;
  if (roleAdmin) {
    Layout = AdminLayout;
  } else {
    Layout = Unauthorized;
  }

  return <Layout>{children}</Layout>;
}

export default PrivateRoutes;
