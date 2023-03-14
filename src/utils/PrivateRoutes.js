import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const sessionId = localStorage.getItem("sessionId");

  return sessionId ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
