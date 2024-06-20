import { host } from "./index";

export const loginAdmin = async (adminCredentials: {login: string, password: string}) => {
  try {
    console.log("Отправка данных на сервер:", adminCredentials);
    const { data } = await host.post("/api/auth", adminCredentials);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const resetPasswordAdmin = async (id: number, password: string) => {
  try {
    const { data } = await host.put(`/api/auth/${id}`, { password });
    console.log("Ответ от сервера при сбросе пароля:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса на сброс пароля");
  }
};