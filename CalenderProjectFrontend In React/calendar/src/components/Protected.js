import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = ({
  redirectPath = '/Login',
}) => {
  const isLogin = localStorage.getItem('token')
  if (!isLogin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet/>
};
export default ProtectedRoute;
