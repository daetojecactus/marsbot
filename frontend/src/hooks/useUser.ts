import User, { createUserAPI, OneUserInfoAPI } from "../http/userAPI";
import { useState, useEffect } from "react";

//хук для создания пользователя
export function useCreateUser() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
  
    const createUserHook = async (user: User) => {
      setLoading(true);
      try {
        const response = await createUserAPI(user);
        setLoading(false);
        return response;
      } catch (err: any) {
        setError(err);
        setLoading(false);
        throw err;
      }
    };
  
    return { createUserHook, loading, error };
  }
  