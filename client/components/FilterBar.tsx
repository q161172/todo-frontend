import { useApp } from "@/contexts/AppContext";

export default function FilterBar() {
  const { search, setSearch, sort, setSort, setFilters } = useApp();

  const clearAll = () => {
    setSearch("");
    setSort("createdDesc");
    setFilters({ status: "all", priorities: [], overdueOnly: false, search: "", sort: "createdDesc" });
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-3 md:p-4 shadow-sm">
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm công việc, mô tả..."
              className="w-full h-10 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm8.32 11.9 3.39 3.39-1.41 1.41-3.39-3.39A8 8 0 1 1 10 2a8 8 0 0 1 8.32 13.9z"/></svg>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-2 text-sm"
          >
            <option value="createdDesc">Mới nhất</option>
            <option value="dueAsc">Sắp đến hạn</option>
            <option value="dueDesc">Hạn xa nhất</option>
            <option value="priorityDesc">Ưu tiên cao</option>
            <option value="priorityAsc">Ưu tiên thấp</option>
            <option value="titleAsc">A → Z</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearAll} className="h-10 px-4 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Xoá bộ lọc</button>
        </div>
      </div>
    </div>
  );
}
