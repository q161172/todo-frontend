import { useApp } from "@/contexts/AppContext";

const PriorityPill = ({ label, value }) => {
  const { filters, setFilters } = useApp();
  const active = filters.priorities.includes(value);
  const toggle = () => {
    const set = new Set(filters.priorities);
    if (active) set.delete(value);
    else set.add(value);
    setFilters({ ...filters, priorities: Array.from(set) });
  };
  const color =
    value === "high" ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200" :
    value === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200" :
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200";
  return (
    <button onClick={toggle} className={`px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-700 ${color} ${active ? "ring-2 ring-offset-1 ring-indigo-500" : ""}`}>
      {label}
    </button>
  );
};

export default function Sidebar() {
  const { filters, setFilters } = useApp();

  return (
    <div className="sticky top-20 space-y-6">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Trạng thái</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { key: "all", label: "Tất cả" },
            { key: "active", label: "Đang làm" },
            { key: "completed", label: "Hoàn tất" },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setFilters({ ...filters, status: s.key })}
              className={`h-9 rounded-md text-sm border transition ${
                filters.status === s.key
                  ? "bg-indigo-600 text-white border-indigo-600 shadow"
                  : "bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Ưu tiên</h2>
        <div className="flex flex-wrap gap-2">
          <PriorityPill label="Cao" value="high" />
          <PriorityPill label="Trung bình" value="medium" />
          <PriorityPill label="Thấp" value="low" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Hết hạn</h2>
            <p className="text-xs text-slate-500">Chỉ hiện việc đã quá hạn</p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={filters.overdueOnly}
              onChange={(e) => setFilters({ ...filters, overdueOnly: e.target.checked })}
            />
            <div className="w-10 h-6 bg-slate-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow after:translate-x-0 peer-checked:after:translate-x-4 after:transition"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
