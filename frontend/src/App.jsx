import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminRoutes, privateRoutes, publicRoutes } from "@/routes/routes";
import PublicLayout from "@/customRoutes/PublicLayout";
import PrivateLayout from "@/customRoutes/PrivateLayout";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import Overlay from "./components/Overlay/Overlay";
import ModalFilter from "./components/ModalFilter/ModalFilter";
import PrivateRoute from "./customRoutes/PrivateRoute ";
import { getMe } from "./services/userService";
import { getUserSuccess } from "./redux/authSlice";
// const PublicLayout = lazy(() => import("@/customRoutes/PublicLayout"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();

        dispatch(getUserSuccess(response));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Modal />
      <ModalFilter />
      <Overlay />
      <Routes>
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PublicLayout route={route}>
                  <PrivateRoute route={route}>
                    <Page />
                  </PrivateRoute>
                </PublicLayout>
              }
            />
          );
        })}
        {adminRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateLayout>
                  <Page />
                </PrivateLayout>
              }
            />
          );
        })}
        {publicRoutes.map((route, index) => {
          let Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<Loading />}>
                  <PublicLayout route={route}>
                    <Page />
                  </PublicLayout>
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
