import { lazy, Suspense,useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { UserProvider } from "./context/UserContext";

// Lazy-loaded components
const Home = lazy(() => import("./core/public/home/Home"));
const LoginPage = lazy(() => import("./core/public/login/LoginPage"));
const RegisterPage = lazy(() => import("./core/public/signup/RegisterPage"));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Checking auth state:", isAuthenticated, role);
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      const roleFromLocalStorage = localStorage.getItem("role");
      dispatch(authActions.login());
      dispatch(authActions.changeRole(roleFromLocalStorage));
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Suspense fallback={<LoadingScreen />}>
      <UserProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
          />
      </Routes>
      </UserProvider>
    </Suspense>
  );
}

export default App;
