import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useCreateAdmin } from "../../hooks/useAdmin";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function AdminRegistration() {
  const [form] = Form.useForm();
  const { createAdminHook, loading, error } = useCreateAdmin();

  const onFinish = async (values: any) => {
    try {
      //вызываем функцию для создания админа
      const response = await createAdminHook(values);
      console.log("Admin registered successfully:", response);
      //очищаем форму после успешной регистрации
      message.success("Admin registered successfully:")
      form.resetFields();
    } catch (error: any) {
      console.error("Failed to register admin:", error);
      message.error(error)
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="firstName"
        label="First name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="login"
        label="Login"
        rules={[
          {
            required: true,
            message: "Please input your login!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="mail"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select role!" }]}
      >
        <Select placeholder="select admin role">
          <Option value="1">Super admin</Option>
          <Option value="2">Admin</Option>
          <Option value="3">Observer</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
