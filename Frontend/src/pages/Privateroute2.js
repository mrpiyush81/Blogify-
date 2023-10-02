import React from "react";
import { Navigate } from "react-router-dom";
function Privateroute2({ logins, children }) {
     if (!logins) {
          return children;
     } else {
          return <Navigate to="/"></Navigate>;
     }
}

export default Privateroute2;
