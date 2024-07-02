import { host } from "./index";

export default interface User {
    id: number;
    key: string;
    firstName: string;
    lastName: string;
    department: string;
    mail: string;
  }

export const createUserAPI = async (user: User) => {
  try {
    const { data } = await host.post("api/user", user);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const OneUserInfoAPI = async (id: number) => {
  try {
    const { data } = await host.get(`/api/user/${id}`);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const AllUsersInfoAPI = async () => {
  try {
    const { data } = await host.get("/api/user");
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const updateUserAPI = async (id: number, user: User) => {
  try {
    const { data } = await host.put(`/api/user/${id}`, user);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const deleteUserAPI = async (id: number) => {
  try {
    const { data } = await host.delete(`/api/user/${id}`);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
