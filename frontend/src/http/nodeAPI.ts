import { host } from "./index";

export default interface Node {
    id?: number;
    text: string;
    parentId?: number | null;
    type: 'question' | 'answer';
}

export const createNodeAPI = async (node: Node) => {
  try {
    const { data } = await host.post("/api/node", node);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const getAllNodesAPI = async () => {
  try {
    const { data } = await host.get("/api/node");
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const getOneNodeAPI = async (id: number) => {
  try {
    const { data } = await host.get(`/api/node/${id}`);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const updateNodeAPI = async (id: number, node: Node) => {
  try {
    const { data } = await host.put(`/api/node/${id}`, node);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};

export const deleteNodeAPI = async (id: number) => {
  try {
    const { data } = await host.delete(`/api/node/${id}`);
    console.log("Ответ от сервера:", data);
    return data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
