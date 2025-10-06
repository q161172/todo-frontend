import { createContext, useContext } from "react";

// Định nghĩa type cho AppContext
export interface AppContextType {
  // User related
  currentUser: any;
  setCurrentUser: (user: any) => void;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  logout: () => void;
  
  // Theme related
  theme: string;
  setTheme: (theme: string) => void;
  
  // Todo related
  todos: any[];
  setTodos: (todos: any[]) => void;
  loading: boolean;
  addTodo: (payload: any) => Promise<void>;
  updateTodo: (id: string, updates: any) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  
  // Filter related
  filters: {
    status: string;
    priorities: string[];
    overdueOnly: boolean;
    search: string;
    sort: string;
  };
  setFilters: (filters: any) => void;
  search: string;
  setSearch: (search: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  displayedTodos: any[];
}

// Tạo Context
export const AppContext = createContext<AppContextType | null>(null);

// Custom hook để sử dụng Context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

