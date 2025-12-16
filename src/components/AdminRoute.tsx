import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // Aqui futuramente validaremos o token com o Backend NestJS
  const isAuthenticated = localStorage.getItem("solara_token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;