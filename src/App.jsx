import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";

// Lazy-loaded components
const Home = lazy(() => import("./core/public/home/Home"));

function App() {
  const isAuthenticated = false;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
