import { host } from "./index";

export const loginAdmin = async (admin: any) => {
  try {
    const { data } = await host.post("/api/auth", admin);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
