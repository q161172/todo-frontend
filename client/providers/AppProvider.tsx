import { AppContext, AppContextType } from "@/contexts/AppContext";
import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { useTodos } from "@/hooks/useTodos";
import { useFilters } from "@/hooks/useFilters";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Sử dụng các custom hooks
  const themeHook = useTheme();
  const userHook = useUser();
  const todosHook = useTodos(userHook.currentUser);
  const filtersHook = useFilters(userHook.currentUser); // Truyền currentUser để kiểm tra login

  // Kết hợp tất cả values
  const value: AppContextType = {
    // User related
    currentUser: userHook.currentUser,
    setCurrentUser: userHook.setCurrentUser,
    login: userHook.login,
    register: userHook.register,
    logout: userHook.logout,
    
    // Theme related
    theme: themeHook.theme,
    setTheme: themeHook.setTheme,
    
    // Todo related - sử dụng từ filtersHook thay vì todosHook
    todos: filtersHook.todos,
    setTodos: todosHook.setTodos, // Giữ lại để tương thích
    loading: filtersHook.loading,
    addTodo: async (payload) => {
      const result = await todosHook.addTodo(payload);
      filtersHook.refresh(); // Refresh todos sau khi thêm
      return result;
    },
    updateTodo: async (id, updates) => {
      const result = await todosHook.updateTodo(id, updates);
      filtersHook.refresh(); // Refresh todos sau khi sửa
      return result;
    },
    deleteTodo: async (id) => {
      await todosHook.deleteTodo(id);
      filtersHook.refresh(); // Refresh todos sau khi xóa
    },
    
    // Filter related
    filters: filtersHook.filters,
    setFilters: filtersHook.setFilters,
    search: filtersHook.filters.search,
    setSearch: filtersHook.setSearch,
    sort: filtersHook.filters.sort,
    setSort: filtersHook.setSort,
    displayedTodos: filtersHook.todos, // Sử dụng todos từ server
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

