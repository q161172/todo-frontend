import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import DateTimePicker from "./DateTimePicker";

function PriorityBadge({ value }) {
  const map = {
    high: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  };
  const label = value === "high" ? "Cao" : value === "medium" ? "Trung bình" : "Thấp";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${map[value]}`}>{label}</span>;
}

function OverdueBadge() {
  return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-rose-600 text-white">Hết hạn</span>;
}

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useApp();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate ? todo.dueDate.slice(0, 16) : "");

  const overdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  const save = async () => {
    await updateTodo(todo.id, { title, description, priority, dueDate: dueDate || null });
    setEditing(false);
  };

  return (
    <div className={`group rounded-xl border ${overdue ? "border-rose-300 dark:border-rose-700" : "border-slate-200 dark:border-slate-800"} bg-white/80 dark:bg-slate-900/80 p-4 shadow-sm hover:shadow-md transition`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={async (e) => {
            try {
              await updateTodo(todo.id, { completed: e.target.checked });
            } catch (error) {
              console.error('Error updating todo:', error);
              // Revert checkbox state on error
              e.target.checked = !e.target.checked;
            }
          }}
          className="mt-1 h-5 w-5 rounded border-slate-300 dark:border-slate-700"
        />
        <div className="flex-1 space-y-2">
          {!editing ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`font-semibold ${todo.completed ? "line-through text-slate-400" : ""}`}>{todo.title}</h3>
                <PriorityBadge value={todo.priority} />
                {overdue && <OverdueBadge />}
              </div>
              {todo.description && (
                <p className={`text-sm ${todo.completed ? "line-through text-slate-400" : "text-slate-600 dark:text-slate-300"}`}>{todo.description}</p>
              )}
              {todo.dueDate && (
                <div className="text-xs text-slate-500 space-y-1">
                  <p>Hạn: {new Date(todo.dueDate).toLocaleString('vi-VN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                  })}</p>
                  {todo.timeRemaining && (
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                      Còn {todo.timeRemaining.days} ngày {todo.timeRemaining.hours} giờ {todo.timeRemaining.minutes} phút
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-2 text-sm" />
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-2 text-sm" placeholder="Mô tả" />
              <div className="flex items-center gap-2">
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-2 text-sm">
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
                <DateTimePicker value={dueDate} onChange={setDueDate} small />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
            {!editing ? (
              <>
                <button onClick={() => setEditing(true)} className="h-8 px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm">Sửa</button>
                <button onClick={() => deleteTodo(todo.id)} className="h-8 px-3 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700">Xoá</button>
              </>
            ) : (
              <>
                <button onClick={save} className="h-8 px-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Lưu</button>
                <button onClick={() => setEditing(false)} className="h-8 px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 text-sm">Huỷ</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
