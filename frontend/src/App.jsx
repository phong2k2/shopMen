import {
  BrowserRouter as Router,
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Navigate,
  Routes
} from "react-router-dom"
import { Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { privateRoutes, publicRoutes } from "@/routes/routes"
import PublicLayout from "@/customRoutes/PublicLayout"
import LoadingScreen from "./components/LoadingScreen"
import Modal from "./components/Modal"
import Overlay from "./components/Overlay/Overlay"
import ModalFilter from "./components/ModalFilter/ModalFilter"
import PrivateRoute from "./customRoutes/PrivateRoute "
import { getMe } from "./services/userService"
import { getUserSuccess } from "./redux/authSlice"
import ModalCategory from "./components/ModalCategory/ModalCategory"
import { useDeliveryInfo } from "./hook/useContext"
import { history } from "./helpers/history"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  const dispatch = useDispatch()
  const { showModalCart, showModalSearch, showModalCategory } =
    useDeliveryInfo()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe()

        dispatch(getUserSuccess(response))
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [dispatch])

  useEffect(() => {
    document.body.classList.remove("locked-scroll")
    if (showModalCart || showModalSearch || showModalCategory) {
      document.body.classList.add("locked-scroll")
    }
  }, [showModalCart, showModalSearch, showModalCategory])

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener("onscroll", handleBeforeUnload)

    return () => {
      window.removeEventListener("onscroll", handleBeforeUnload)
    }
  }, [])

  return (
    <HistoryRouter history={history}>
      <ScrollToTop />
      <Routes>
        {privateRoutes.map((route, index) => {
          const Page = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <PublicLayout route={route}>
                    <PrivateRoute route={route}>
                      <Page />
                    </PrivateRoute>
                  </PublicLayout>
                </Suspense>
              }
            />
          )
        })}
        {publicRoutes.map((route, index) => {
          const Page = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <PublicLayout route={route}>
                    <Page />
                  </PublicLayout>
                </Suspense>
              }
            />
          )
        })}
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <Modal />
      <ModalFilter />
      <ModalCategory />
      <Overlay />
    </HistoryRouter>
  )
}

export default App
