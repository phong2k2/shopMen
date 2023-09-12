// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { privateRoutes } from "@/routes/routes";
import PublicLayout from '@/customRoutes/PublicLayout'
import PrivateLayout from '@/customRoutes/PrivateLayout'


function App() {
  return (
    <Router>
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          
          const Page = route.component;
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
