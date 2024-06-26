import { useState, useEffect } from "react";
import AdminCredentials, { loginAdminAPI, resetPasswordAdminAPI } from "../http/authAPI";
import { useOneAdminInfo } from './useAdmin';


//хук для авторизации
export function useLoginAdmin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loginAdminHook = async (adminCredentials: AdminCredentials) => {
    setLoading(true);
    try {
      const response = await loginAdminAPI(adminCredentials);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { loginAdminHook, loading, error };
}


//хук для смены пароля у админа
export function useResetPasswordAdmin() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const { oneAdminInfoHook } = useOneAdminInfo();
  
    const resetPassword = async (newPassword: string) => {
      setLoading(true);
      try {
        if (!oneAdminInfoHook) {
          throw new Error('Admin information not available');
        }
        const { id } = oneAdminInfoHook;
        const token = localStorage.getItem("token");
        if (token === null) {
          throw new Error("No token found");
        }
        const response = await resetPasswordAdminAPI(id, newPassword, token);
        setLoading(false);
        return response;
      } catch (err: any) {
        setError(err);
        setLoading(false);
        throw err;
      }
    };
  
    return { resetPassword, loading, error };
  }
  