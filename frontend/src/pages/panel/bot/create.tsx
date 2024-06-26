import React, { useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useCreateNodeChain, useGetAllNodes } from "../../../hooks/useNode";
import Node from "../../../http/nodeAPI";

const { Option } = Select;

export default function NodeChainForm () {
  const { createNodeChainHook } = useCreateNodeChain();
  const { nodes: allNodes, loading: nodesLoading } = useGetAllNodes();
  const [form] = Form.useForm();
  const [nodes, setNodes] = useState<Node[]>([
    { text: "", type: "question", parentId: null },
  ]);

  //отправка формы
  const onFinish = async () => {
    try {
      const responses = await createNodeChainHook(nodes);
      message.success(
        `Node chain created successfully: ${responses.length} nodes`
      );
      form.resetFields(); //сброс полей формы после успешного создания
    } catch (error) {
      message.error("Failed to create node chain");
    }
  };

  //добавление нового ответа
  const addNode = () => {
    const newNode: Node = { text: "", type: "answer", parentId: null };
    setNodes([...nodes, newNode]);
  };

  //удаление ответа по индексу
  const removeNode = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1); //удаляем узел из массива по индексу
    setNodes(newNodes);
  };

  //обработка изменения узла
  // const handleNodeChange = (index: number, changedValues: Partial<Node>) => {
  //   const newNodes = [...nodes];
  //   if (index === 0) {
  //     //если это первый вопрос, устанавливаем parentId в null
  //     newNodes[index] = {
  //       ...newNodes[index],
  //       ...changedValues,
  //       parentId: null,
  //     };
  //   } else {
  //     newNodes[index] = { ...newNodes[index], ...changedValues };

  //   setNodes(newNodes); //обновляем состояние узлов
  // };

  //обработка изменения узла
  const handleNodeChange = (index: number, changedValues: Partial<Node>) => {
    const newNodes = [...nodes];
      newNodes[index] = { ...newNodes[index], ...changedValues };

    setNodes(newNodes); //обновляем состояние узлов
  };


  return (
    <Form
      form={form}
      name="nodeChainForm"
      onFinish={onFinish}
      autoComplete="off"
    >
      {/*отображение всех вопросов и ответов */}
      {nodes.map((node, index) => (
        <Space
          key={index}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item
            label={index === 0 ? "Question" : "Answer"}
            name={[index, "text"]}
            initialValue={node.text}
            rules={[{ required: true, message: "Please input text!" }]}
          >
            <Input
              placeholder={index === 0 ? "Enter question" : "Enter answer"}
              onChange={(e) =>
                handleNodeChange(index, { text: e.target.value })
              }
            />
          </Form.Item>

          {/*выбор родительского узла для ответов начиная с индекса 1*/}
          {index > 0 && (
            <Form.Item
              label="Parent Node"
              name={[index, "parentId"]}
              initialValue={node.parentId}
              rules={[
                { required: true, message: "Please select parent node!" },
              ]}
            >
              <Select
                style={{ width: 200 }}
                onChange={(value) =>
                  handleNodeChange(index, { parentId: value })
                }
              >
                {allNodes.map((n) => (
                  <Option key={n.id} value={n.id}>
                    {n.text}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/*кнопка для удаления ответов, начиная с индекса 1*/}
          {index > 0 && (
            <MinusCircleOutlined
              style={{ fontSize: 20, marginTop: 4 }}
              onClick={() => removeNode(index)}
            />
          )}

          {/*кнопка добавления нового ответа*/}
          {index === nodes.length - 1 && (
            <Button type="dashed" onClick={addNode} style={{ width: "auto" }}>
              <PlusOutlined /> Add {index === 0 ? "Answer" : "Node"}
            </Button>
          )}
        </Space>
      ))}

      {/*сохраняем*/}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

