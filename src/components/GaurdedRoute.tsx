import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context";

const GuardedRoute = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default GuardedRoute;
