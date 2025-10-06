import { useState, useEffect } from "react";
import * as authService from "@/services/authService";

export const useUser = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      
      // Sử dụng user data từ API response
      const user = response.user;
      if (!user) throw new Error("User data not found in response");
      
      setCurrentUser(user);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userData", JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await authService.register(name, email, password);
      // Auto login ngay sau khi đăng ký thành công
      await login(email, password);
      return res;
    } catch (error) {
      throw new Error(error.message || "Register failed");
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem("userData");
    setCurrentUser(null);
  };

  return {
    currentUser,
    setCurrentUser,
    login,
    register,
    logout,
  };
};

