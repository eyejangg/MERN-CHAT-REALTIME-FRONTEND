import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

// Lazy-loaded routes (not critical for first paint)
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore(); // ดึง authUser, checkAuth, isCheckingAuth จาก useAuthStore มาจาก useAuthStore.js
  useEffect(() => { // ใช้ useEffect เพื่อตรวจสอบ Auth เมื่อ component ถูก mount
    checkAuth(); // เรียกใช้ checkAuth เพื่อตรวจสอบ Auth
  }, [checkAuth]); // dependency array เพื่อป้องกันการเรียกใช้ checkAuth ซ้ำ
  if (isCheckingAuth && !authUser) {
    return <div className="flex items-center justify-center h-screen"> <Loader className="w-10 h-10 animate-spin text-primary"
    /></div>
  }
  return (
    <div className="min-h-dvh bg-base-100 text-base-content">
      <Navbar />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-dvh bg-base-100">
            <Loader className="w-8 h-8 animate-spin text-primary" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Suspense>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--color-base-200)",
            color: "var(--color-base-content)",
            border: "1px solid var(--color-base-300)",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
};

export default App;
