import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../Auth Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [roll, isAdminLoading] = useAdmin();
  const location = useLocation();

  const isAdmin = roll.admin;

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
