import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import DateTimePicker from "./DateTimePicker";

export default function TodoForm() {
  const { addTodo } = useApp();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTodo({ title, description, priority, dueDate: dueDate || null });
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-4 shadow-sm space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Thêm công việc mới..."
          className="md:col-span-2 h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 text-sm"
        >
          <option value="high">Cao</option>
          <option value="medium">Trung bình</option>
          <option value="low">Thấp</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả"
          className="md:col-span-2 h-11 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <DateTimePicker
          value={dueDate}
          onChange={setDueDate}
          className=""
        />
      </div>
      <div className="flex items-center justify-end">
        <button type="submit" className="h-11 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow">Thêm</button>
      </div>
    </form>
  );
}
