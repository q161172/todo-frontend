import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./providers/AppProvider";
import { useApp } from "./contexts/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
// Register page merged into Login via toggle; keep route for deep-links

function RequireAuth({ children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

function AppShell() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><Index /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Root() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
