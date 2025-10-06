import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FilterBar from "@/components/FilterBar";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <Header />
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
        <aside className="order-2 lg:order-1"><Sidebar /></aside>
        <main className="order-1 lg:order-2 space-y-6">
          <FilterBar />
          <TodoForm />
          <TodoList />
        </main>
      </div>
    </div>
  );
}
