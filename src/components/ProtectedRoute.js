import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ condition, children, goto }) => {
  if (condition) {
    return <Navigate to={goto} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
