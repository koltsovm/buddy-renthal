import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const LandingPage = lazy(
  () => import("./features/auth/components/LandingPage"),
);
const LoginPage = lazy(() => import("./features/auth/components/LoginPage"));
// TODO: Раскомментировать после реализации страниц
// const RegisterPage = lazy(() => import('./features/auth/components/RegisterPage'));
// const GroupsPage = lazy(() => import('./features/groups/pages/GroupsPage'));
// const EquipmentPage = lazy(() => import('./features/equipment/pages/EquipmentPage'));
// const BookingsPage = lazy(() => import('./features/bookings/pages/BookingsPage'));
// const ExpensesPage = lazy(() => import('./features/expenses/pages/ExpensesPage'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* TODO: Раскомментировать после реализации страниц
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/groups/:id" element={<GroupsPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        */}
      </Routes>
    </Suspense>
  );
}
