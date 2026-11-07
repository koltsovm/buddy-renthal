import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const LandingPage = lazy(
  () => import("./features/auth/components/LandingPage"),
);
const LoginPage = lazy(() => import("./features/auth/components/LoginPage"));
const RegisterPage = lazy(() => import("./features/auth/components/RegisterPage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
}
