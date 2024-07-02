import React, { useState } from 'react';
import { Button, Form, Input, Select, message, Modal } from "antd";
import { useCreateAdmin } from "../../hooks/useAdmin";
import { useRouter } from "next/router";

const { Option } = Select;

export default function AdminRegistration() {
  const [form] = Form.useForm();
  const { createAdminHook, loading, error } = useCreateAdmin();
  const [modal, contextHolder] = Modal.useModal();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      //вызываем функцию для создания админа
      const response = await createAdminHook(values);
      console.log("Admin registered successfully:", response);
      //очищаем форму после успешной регистрации
      form.resetFields();
      showModal()
    } catch (error: any) {
      console.error("Failed to register admin:", error);
      Modal.error({
        title: "Error",
        content: error.message,
      });
    }
  };

  const showModal = () => {
    const instance = modal.success({
      title: "Admin Create Successfully",
      content: `Do you want to return to the panel page?`,
      onOk: () => goToPanel(),
      onCancel: () => instance.destroy(),
      okCancel: true,
    });
  };

  //возвращаемся обратно на главную
  const goToPanel = () => {
    router.push('/panel');
  };


  return (
    <div className="registartion">
      <div className="registartion__box">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          className="registartion__form"
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            className="registartion__item"
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
            <Input className="registartion__input" />
          </Form.Item>

          <Form.Item
            className="registartion__item"
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
            <Input className="registartion__input" />
          </Form.Item>

          <Form.Item
            className="registartion__item"
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
            <Input className="registartion__input" />
          </Form.Item>

          <Form.Item
            className="registartion__item"
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
            <Input.Password className="registartion__input" />
          </Form.Item>

          <Form.Item
            className="registartion__item"
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
            <Input.Password className="registartion__input" />
          </Form.Item>

          <Form.Item
            className="registartion__item"
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
            <Input className="registartion__input" />
          </Form.Item>

          <Form.Item
            className="registartion__item"
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role!" }]}
          >
            <Select
              placeholder="select admin role"
              className="registartion__select"
            >
              <Option className="registartion__option" value="1">
                Super admin
              </Option>
              <Option className="registartion__option" value="2">
                Admin
              </Option>
              <Option className="registartion__option" value="3">
                Observer
              </Option>
            </Select>
          </Form.Item>

          <Form.Item className="registartion__item">
            <Button
              type="primary"
              htmlType="submit"
              className="registartion__btn"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      {contextHolder}
    </div>
  );
}
