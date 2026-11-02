// TODO: Implement Zustand stores for UI state
import { useState } from 'react';

export const useAuthStore = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return {
    user,
    isAuthenticated,
    login: (userData: any) => {
      setUser(userData);
      setIsAuthenticated(true);
    },
    logout: () => {
      setUser(null);
      setIsAuthenticated(false);
    }
  };
};