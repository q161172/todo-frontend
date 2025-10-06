import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { displayedTodos, loading } = useApp();
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const totalPages = Math.max(1, Math.ceil(displayedTodos.length / pageSize));
  useEffect(() => {
    // Clamp page when filters/search change
    if (page > totalPages) setPage(1);
  }, [displayedTodos.length, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return displayedTodos.slice(start, start + pageSize);
  }, [displayedTodos, page]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: pageSize }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 animate-pulse" />
        ))}
      </div>
    );
  }

  if (displayedTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 opacity-80 mb-4" />
        <p className="text-sm text-slate-600 dark:text-slate-300">Không có công việc nào phù hợp bộ lọc.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {pageItems.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </div>

      <Pager page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}

function Pager({ page, totalPages, onChange }) {
  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="mt-6 flex items-center justify-center gap-1 text-sm select-none">
      <button
        className={`h-8 w-8 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 ${canPrev ? "hover:bg-slate-50 dark:hover:bg-slate-800" : "opacity-50 cursor-not-allowed"}`}
        onClick={() => canPrev && onChange(1)}
        aria-label="Trang đầu"
      >
        «
      </button>
      <button
        className={`h-8 w-8 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 ${canPrev ? "hover:bg-slate-50 dark:hover:bg-slate-800" : "opacity-50 cursor-not-allowed"}`}
        onClick={() => canPrev && onChange(page - 1)}
        aria-label="Trang trước"
      >
        ‹
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-slate-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`h-8 min-w-8 px-2 rounded-md border text-sm ${
              p === page
                ? "bg-indigo-600 border-indigo-600 text-white shadow"
                : "border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        className={`h-8 w-8 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 ${canNext ? "hover:bg-slate-50 dark:hover:bg-slate-800" : "opacity-50 cursor-not-allowed"}`}
        onClick={() => canNext && onChange(page + 1)}
        aria-label="Trang sau"
      >
        ›
      </button>
      <button
        className={`h-8 w-8 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 ${canNext ? "hover:bg-slate-50 dark:hover:bg-slate-800" : "opacity-50 cursor-not-allowed"}`}
        onClick={() => canNext && onChange(totalPages)}
        aria-label="Trang cuối"
      >
        »
      </button>
    </div>
  );
}

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, 2, total - 1, total, current - 1, current, current + 1]);
  const arr = Array.from(set)
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push("...");
  }
  return out;
}
