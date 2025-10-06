import { useState } from "react";
import { createTodo, updateTodo, deleteTodo } from "@/services/todoService.js";

export const useTodos = (currentUser: any) => {
  const [loading, setLoading] = useState(false);

  const addTodo = async (payload: any) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    setLoading(true);
    try {
      const created = await createTodo(payload);
      return created;
    } finally {
      setLoading(false);
    }
  };

  const updateTodoById = async (id: string, updates: any) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    setLoading(true);
    try {
      const updated = await updateTodo(id, updates);
      return updated;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTodoById = async (id: string) => {
    if (!currentUser) {
      throw new Error('No current user');
    }
    setLoading(true);
    try {
      await deleteTodo(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    todos: [], // Không cần local state nữa vì useFilters sẽ quản lý
    setTodos: () => {}, // Placeholder để tương thích
    loading,
    addTodo,
    updateTodo: updateTodoById,
    deleteTodo: deleteTodoById,
  };
};

