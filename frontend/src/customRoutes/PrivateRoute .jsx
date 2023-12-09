import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, route }) => {
  const { pathname } = useLocation();
  const authState = useSelector((state) => state?.auth?.login);
  const isLogin = authState?.isLogin;

  // Nếu route yêu cầu đăng nhập (protected)
  if (route?.protected) {
    // Nếu đã đăng nhập, hiển thị nội dung của route con
    if (!isLogin) {
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
