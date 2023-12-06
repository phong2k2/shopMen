import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, route }) => {
  const { pathname } = useLocation();
  const authState = useSelector((state) => state?.auth?.login);
  const user = authState?.currentUser?.data;
  const accessToken = authState?.currentUser?.accessToken;
  const isLogin = authState?.isLogin;

  // Nếu route yêu cầu đăng nhập (protected)
  if (route?.protected) {
    // Nếu đã đăng nhập, hiển thị nội dung của route con
    console.log(
      "🚀 ~ file: PrivateRoute .jsx:15 ~ PrivateRoute ~ isLogin && accessToken && user:",
      isLogin && accessToken && user
    );
    if (!(isLogin && accessToken && user)) {
      return <Navigate to={`/auth?redirect=${pathname}`} />;
    }
  }
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
  route: PropTypes.shape({
    protected: PropTypes.bool,
  }),
};

export default PrivateRoute;
