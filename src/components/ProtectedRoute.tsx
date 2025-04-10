import { ComponentType, useContext } from "react";
import { Route, Redirect, RouteComponentProps } from "wouter";
import { AuthContext } from "@contexts/AuthContext";
import Loading from "@components/Loading";

interface ProtectedRouteProps {
  path: string
  component: ComponentType<RouteComponentProps>
}

const ProtectedRoute = ({ path, component }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error('La página debe utilizarse dentro de un AuthProvider');

  const { user, isLoading } = authContext;  
  if (isLoading) return <Loading />;

  return user ? <Route path={path} component={ component } /> : <Redirect to="/" />

}

export default ProtectedRoute;
