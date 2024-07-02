import Admin, { createAdminAPI, OneAdminInfoAPI, AllAdminsInfoAPI } from "../http/adminAPI";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: number;
  login: string;
  role: string;
}

//хук для создания админа
export function useCreateAdmin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createAdminHook = async (admin: Admin) => {
    setLoading(true);
    try {
      const response = await createAdminAPI(admin);
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { createAdminHook, loading, error };
}

//получаем инфу по одному админу
export function useOneAdminInfo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [oneAdminInfoHook, setOneAdminInfoHook] = useState<Admin | null>(null);

  //декодируем токен и вытаскиваем от туда id
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
      const adminId = decoded.id;

      OneAdminInfoAPI(adminId)
        .then((data) => {
          setOneAdminInfoHook(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, []);

  return { oneAdminInfoHook, loading, error };
}

//получаем всех админов
export function useAllAdminsInfo() {
  const [allAdminsInfoHook, setAllAdminsInfoHook] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await AllAdminsInfoAPI();
      setAllAdminsInfoHook(response);
      setLoading(false);
    } catch (err: any) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, []);

  return {allAdminsInfoHook, loading, error}
}