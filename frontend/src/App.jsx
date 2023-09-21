// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { publicRoutes } from "./routes/routes";
import { privateRoutes } from "@/routes/routes";
import PublicLayout from '@/customRoutes/PublicLayout'
import PrivateLayout from '@/customRoutes/PrivateLayout'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/client/Home/Home";




function App() {
  const isLogin = useSelector((state) => state.auth.login.isLogin)
  return (
    <Router>
      <ToastContainer />
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Page = route.component;
          if(route.auth && isLogin) {
            Page = Home
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PublicLayout route={route}>
                  <Page />
                </PublicLayout>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {

          const Page = route.component;
          return (
            <Route
            key={index}
            path={route.path}
            element={
              <PrivateLayout >
                <Page />
              </PrivateLayout>
            }
          />
          );
        })}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
