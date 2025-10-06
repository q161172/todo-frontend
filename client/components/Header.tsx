import { useApp } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { theme, setTheme, currentUser, logout } = useApp();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30"></div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">TodoPro</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Focus. Finish. Flourish.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-md bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700">
              <span className="text-sm text-slate-700 dark:text-slate-200">{currentUser.name}</span>
            </div>
          )}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 flex items-center justify-center hover:shadow transition"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M21.64 13A9 9 0 1 1 11 2.36 7 7 0 0 0 21.64 13z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zm0-20a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zM4.22 5.64a1 1 0 0 1 1.41 0L6.4 6.4A1 1 0 0 1 5 7.83L4.22 7.05a1 1 0 0 1 0-1.41zM18.36 4.22a1 1 0 0 1 0 1.41L17.6 6.4A1 1 0 0 1 16.17 5l.78-.78a1 1 0 0 1 1.41 0zM3 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM4.22 18.36a1 1 0 0 1 1.41 0l.78.78A1 1 0 0 1 5 21l-.78-.78a1 1 0 0 1 0-1.41zM17.6 17.6a1 1 0 0 1 1.41 1.42l-.78.78A1 1 0 0 1 16.17 19l1.43-1.4z"/>
              </svg>
            )}
          </button>
          <button onClick={onLogout} className="h-9 px-3 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700">Đăng xuất</button>
        </div>
      </div>
    </header>
  );
}
