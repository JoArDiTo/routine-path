import './App.css'
import "@fontsource-variable/onest/wght.css";
import { Router, Route, Switch } from "wouter"
import IndexPage from "@pages/Index"
import LoginPage from "@pages/Login"
import RegisterPage from "@pages/Register"
import NotFoundPage from "@pages/404";
import DashboardPage from "@pages/Dashboard";
import ProfilePage from "@pages/Profile";
import { AuthProvider } from "@contexts/AuthContext";
import { Toaster } from "sonner";
import ProtectedRoute from "@components/ProtectedRoute";

function App() { 
  return (
    <Router>
      <AuthProvider>
        <Toaster richColors />
        <Switch>
          <Route path="/" component={ IndexPage } />
          <Route path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          
          <ProtectedRoute path="/dashboard" component={ DashboardPage } />
          <ProtectedRoute path="/perfil" component={ ProfilePage } />

          <Route component={ NotFoundPage }></Route>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
