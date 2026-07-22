import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Subscription } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  subscription: Subscription | null;
  isLoading: boolean;
  isSessionExpired: boolean;
  login: (email: string) => Promise<void>;
  register: (fullName: string, email: string, pass: string, confirmPass: string) => Promise<void>;
  verifyEmail: (email: string, otpCode: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otpCode: string, newPass: string) => Promise<void>;
  logout: () => void;
  logoutFromAllDevices: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
  dismissSessionExpired: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  const refreshUser = async () => {
    try {
      const u = await apiService.getCurrentUser();
      setUser(u);
    } catch (e) {
      console.error('Failed to load user', e);
      setIsSessionExpired(true);
    }
  };

  const refreshSubscription = async () => {
    try {
      const status = await apiService.getSubscriptionStatus();
      setSubscription(status.subscription);
    } catch (e) {
      console.error('Failed to load subscription', e);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await refreshUser();
      await refreshSubscription();
      setIsLoading(false);
    };
    init();
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    setIsSessionExpired(false);
    const u = await apiService.login(email);
    setUser(u);
    await refreshSubscription();
    setIsLoading(false);
  };

  const register = async (fullName: string, email: string, pass: string, confirmPass: string) => {
    await apiService.registerUser(fullName, email, pass, confirmPass);
  };

  const verifyEmail = async (email: string, otpCode: string) => {
    await apiService.verifyEmail(email, otpCode);
    if (user) {
      setUser({ ...user, isEmailVerified: true });
    }
  };

  const forgotPassword = async (email: string) => {
    await apiService.forgotPassword(email);
  };

  const resetPassword = async (email: string, otpCode: string, newPass: string) => {
    await apiService.resetPassword(email, otpCode, newPass);
  };

  const logout = () => {
    setUser(null);
    setSubscription(null);
  };

  const logoutFromAllDevices = async () => {
    await apiService.logoutAllDevices();
    logout();
  };

  const dismissSessionExpired = () => {
    setIsSessionExpired(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isLoading,
        isSessionExpired,
        login,
        register,
        verifyEmail,
        forgotPassword,
        resetPassword,
        logout,
        logoutFromAllDevices,
        refreshUser,
        refreshSubscription,
        dismissSessionExpired
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
