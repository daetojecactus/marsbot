import { host } from "./index";

export const createAdmin = async (admin: string) => {
  try {
    const { data } = await host.post("/api/admin", admin);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};


export const fetchAdminInfo = async (id: number) => {
  try {
    const { data } = await host.get(`/api/admin/${id}`);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
