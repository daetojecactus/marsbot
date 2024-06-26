import { useState, useEffect } from "react";
import Node, { createNodeAPI, getAllNodesAPI } from "../http/nodeAPI";

// Хук для создания цепочки узлов
export function useCreateNodeChain() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createNodeChainHook = async (nodes: Node[]) => {
    setLoading(true);
    try {
      const responses = await Promise.all(nodes.map(node => createNodeAPI(node)));
      setLoading(false);
      return responses;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { createNodeChainHook, loading, error };
}

// Хук для получения всех узлов
export function useGetAllNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNodes = async () => {
    setLoading(true);
    try {
      const response = await getAllNodesAPI();
      setNodes(response);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, []);

  return { nodes, loading, error };
}
