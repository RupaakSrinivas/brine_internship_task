import { Navigate, Outlet } from "react-router-dom";
import { UserData } from "../context";

const GuardedRoute = () => {
  // const { user } = useUser();
  const storedUserData = localStorage.getItem("user");
  if (storedUserData !== null) {
    const userData: UserData = JSON.parse(localStorage.getItem("user") || "");
    return userData.id ? <Outlet /> : <Navigate to="/login" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default GuardedRoute;
