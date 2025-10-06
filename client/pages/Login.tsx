import { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import * as authService from "@/services/authService";

export default function Login() {
  const { login, register, currentUser, theme, setTheme } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser]);

  // Set default mode based on route (e.g., /register)
  useEffect(() => {
    if (location.pathname.toLowerCase() === "/register") {
      setMode("register");
    }
  }, [location.pathname]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (mode === "register") {
      if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setError("Vui lòng điền đầy đủ thông tin");
        return;
      }
      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận không khớp");
        return;
      }
      try {
        await register(name.trim(), email.trim(), password);
        navigate("/");
      } catch (err) {
        setError(err.message || "Đăng ký thất bại");
      }
      return;
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-glow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600" />
            <div>
              <h1 className="text-lg font-bold">TodoPro</h1>
              <p className="text-xs text-slate-500 -mt-0.5">{mode === "login" ? "Đăng nhập để tiếp tục" : "Tạo tài khoản mới"}</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M21.64 13A9 9 0 1 1 11 2.36 7 7 0 0 0 21.64 13z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
              </svg>
            )}
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium mb-1">Họ tên</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 text-sm"
                placeholder="Nhập tên của bạn"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 pr-10 text-sm"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.5 12c0-1.5-3-5.5-10.5-5.5S1.5 10.5 1.5 12s3 5.5 10.5 5.5S22.5 13.5 22.5 12z"/>
                    <path d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"/>
                    <path fillRule="evenodd" d="M1.5 12a10.5 10.5 0 1118 0 10.5 10.5 0 01-18 0zM12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 text-sm"
                placeholder="••••••"
              />
            </div>
          )}
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button type="submit" className="w-full h-11 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            {mode === "login" ? "Đăng nhập" : "Đăng ký"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-500">
            {mode === "login" ? (
              <>
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Đăng ký ngay
                </button>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Đăng nhập
                </button>
              </>
            )}
          </p>
          <p className="text-xs text-slate-400 mt-2">
            💡 Đảm bảo backend đang chạy tại http://localhost:4000
          </p>
        </div>

      </div>
    </div>
  );
}
