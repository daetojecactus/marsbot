import { host } from "./index";

export default interface AdminCredentials {
  login: string;
  password: string;
}

export const loginAdminAPI = async (adminCredentials: AdminCredentials) => {
  try {
    console.log("Отправка данных на сервер:", adminCredentials);
    const { data } = await host.post("/api/auth", adminCredentials);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPasswordAdminAPI = async (
  id: number,
  password: string,
  token: string
) => {
  try {
    const { data } = await host.put(
      `/api/auth/${id}`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Ответ от сервера при сбросе пароля:", data);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
