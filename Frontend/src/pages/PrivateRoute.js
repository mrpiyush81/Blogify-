import React from "react";
import { Navigate } from "react-router-dom";
function PrivateRoute({ logins, children }) {
     if (logins) {
          return children;
     } else {
          return <Navigate to="/login"></Navigate>;
     }
}

export default PrivateRoute;
