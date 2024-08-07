import { host } from "./index";

export default interface Admin {
  id: number;
  login: string;
  role: string;
  firstName: string;
  lastName: string;
  mail: string;
}

export const createAdminAPI = async (admin: Admin) => {
  try {
    const { data } = await host.post("/api/admin", admin);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const OneAdminInfoAPI = async (id: number) => {
  try {
    const { data } = await host.get(`/api/admin/${id}`);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const AllAdminsInfoAPI = async () => {
  try {
    const { data } = await host.get("/api/admin");
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const updateAdminAPI = async (id: number, admin: Admin) => {
  try {
    const { data } = await host.put(`/api/admin/${id}`, admin);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const deleteAdminAPI = async (id: number) => {
  try {
    const { data } = await host.delete(`/api/admin/${id}`);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
