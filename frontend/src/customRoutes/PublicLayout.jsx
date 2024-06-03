import { Fragment } from "react";
import DefaultLayout from "@/layouts/DefaultLayout";

function PublicRoutes({ route, children }) {
  let Layout;

  if (route.layout) {
    Layout = route.layout;
  } else if (route.layout === null) {
    Layout = Fragment;
  } else {
    Layout = DefaultLayout;
  }

  return <Layout>{children}</Layout>;
}

export default PublicRoutes;
